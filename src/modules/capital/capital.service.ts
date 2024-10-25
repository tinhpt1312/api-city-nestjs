import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, CityFacility, Facility } from 'src/entities';
import { In, Repository } from 'typeorm';
import { UpdateCapitalDto, CreateCapitalDto } from './dto/index';

@Injectable()
export class CapitalService {
  constructor(
    @InjectRepository(CityFacility)
    private cityFacilityRepository: Repository<CityFacility>,
    @InjectRepository(Capital) private capitalRepository: Repository<Capital>,
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
  ) {}

  async newCapital(createCapitalDto: CreateCapitalDto): Promise<Capital> {
    const { name, description, facilitiesId } = createCapitalDto;

    const newCapital = new Capital();
    newCapital.name = name;
    newCapital.description = description;
    await this.capitalRepository.save(newCapital);

    const facilities = await this.facilityRepository.find({
      where: { id: In(facilitiesId) },
    });

    if (!facilities) throw new NotFoundException('Facility not found');

    const cityFacilities = facilities.map((facility) => {
      const facilityToCapital = new CityFacility();
      facilityToCapital.capital = newCapital;
      facilityToCapital.facility = facility;
      return facilityToCapital;
    });

    await this.cityFacilityRepository.save(cityFacilities);

    return newCapital;
  }

  async findAll() {
    return await this.capitalRepository
      .createQueryBuilder('capital')
      .leftJoinAndSelect('capital.district', 'district') // District sẽ tự động join dựa trên quan hệ
      .leftJoinAndSelect('capital.users', 'users') // Tương tự cho users
      .leftJoinAndSelect('capital.country', 'countries') // Country cũng sẽ tự động join
      .leftJoinAndSelect('capital.cityfacility', 'cityfacility') // CityFacility join theo quan hệ nhiều-nhiều
      .leftJoinAndSelect('cityfacility.facility', 'facilities') // Join Facility qua bảng trung gian CityFacility
      .addSelect([
        'countries.name', // Chọn thêm trường country name
        'users.username', // Chọn thêm trường username của users
        'district.name', // Chọn thêm trường name của district
        'facilities.name', // Chọn thêm trường name của facility
      ])
      .getMany();
  }

  async findOne(id: number) {
    return await this.capitalRepository
      .createQueryBuilder('capital')
      .leftJoin('capital.district', 'district')
      .leftJoin('capital.users', 'users')
      .leftJoin('capital.country', 'country')
      .addSelect(['country.name', 'users.username', 'district.name'])
      .where('capital.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateCapitalDto: UpdateCapitalDto) {
    const city = await this.findOne(id);

    if (!city) {
      throw new NotFoundException();
    }

    Object.assign(city, updateCapitalDto);

    return await this.capitalRepository.save(city);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }
    return await this.capitalRepository.remove(city);
  }
}
