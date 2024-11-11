import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, CityFacility, Facility, Users } from 'src/entities';
import { In, Repository } from 'typeorm';
import { UpdateCapitalDto, CreateCapitalDto, CapitalResponseDto } from './dto';

@Injectable()
export class CapitalService {
  constructor(
    @InjectRepository(CityFacility)
    private cityFacilityRepository: Repository<CityFacility>,
    @InjectRepository(Capital) private capitalRepository: Repository<Capital>,
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
  ) {}

  async newCapital(
    createCapitalDto: CreateCapitalDto,
    user: Users,
  ): Promise<CapitalResponseDto> {
    const { name, description, facilitiesId } = createCapitalDto;

    const newCapital = await this.capitalRepository.save({
      name,
      description,
      timestamp: { createdBy: user },
    });

    const facilities = await this.facilityRepository.find({
      where: { id: In(facilitiesId) },
    });

    if (!facilities) {
      throw new NotFoundException('Facility not found');
    }

    const cityFacilities = facilities.map((facility) => {
      const facilityToCapital = new CityFacility();
      facilityToCapital.capitals = newCapital;
      facilityToCapital.facility = facility;
      return facilityToCapital;
    });

    await this.cityFacilityRepository.save(cityFacilities);

    const responseDto = new CapitalResponseDto();
    responseDto.id = newCapital.id;
    responseDto.name = newCapital.name;
    responseDto.description = newCapital.description;
    responseDto.createdAt = newCapital.timestamp.createdAt;
    responseDto.createdBy = newCapital.timestamp.createdBy?.username;

    return responseDto;
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [result, total] = await this.capitalRepository
      .createQueryBuilder('capital')
      .where('capital.deleted_at IS NULL')
      .leftJoinAndSelect('capital.districts', 'districts')
      .leftJoinAndSelect('capital.users', 'users')
      .leftJoinAndSelect('capital.country', 'countries')
      .leftJoinAndSelect('capital.cityfacilities', 'cityfacility')
      .leftJoinAndSelect('cityfacility.facility', 'facilities')
      .addSelect([
        'countries.name',
        'users.username',
        'districts.name',
        'facilities.name',
      ])
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: result,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const capital = await this.capitalRepository
      .createQueryBuilder('capital')
      .where('capital.deleted_at IS NULL')
      .leftJoin('capital.districts', 'district')
      .leftJoin('capital.users', 'users')
      .leftJoin('capital.country', 'country')
      .leftJoin('capital.cityfacilities', 'cityfacility')
      .leftJoin('cityfacility.facility', 'facility')
      .addSelect([
        'country.name',
        'users.username',
        'district.name',
        'facility.name',
      ])
      .where('capital.deleted_at IS NULL')
      .andWhere('capital.id = :id', { id })
      .getOne();

    return capital;
  }

  async update(id: number, updateCapitalDto: UpdateCapitalDto, user: Users) {
    const capital = await this.findOne(id);

    Object.assign(capital, updateCapitalDto);

    capital.timestamp.updatedAt = new Date();
    capital.timestamp.updatedBy = user;

    return await this.capitalRepository.save(capital);
  }

  async remove(id: number): Promise<void> {
    const capitals = await this.capitalRepository.findOneBy({ id });

    await this.cityFacilityRepository.softDelete({ capitals });

    await this.capitalRepository.softDelete(id);
  }
}
