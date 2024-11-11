import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, District, Users } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateDistrictDto, UpdateDistrictDto } from './dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,

    @InjectRepository(Capital)
    private capitalRepository: Repository<Capital>,
  ) {}

  private async findCapitalById(capitalId: number): Promise<Capital> {
    const capital = await this.capitalRepository.findOneBy({ id: capitalId });

    if (!capital)
      throw new HttpException('The capital is empty', HttpStatus.NOT_FOUND);

    return capital;
  }

  async create(
    createDistrictDto: CreateDistrictDto,
    user: Users,
  ): Promise<District> {
    const { name, capitalid } = createDistrictDto;

    const capital = await this.findCapitalById(capitalid);

    const newDistrict = new District();
    newDistrict.name = name;
    newDistrict.capital = capital;
    newDistrict.timestamp.createdBy = user;

    return await this.districtRepository.save(newDistrict);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [result, total] = await this.districtRepository
      .createQueryBuilder('district')
      .where('district.deleted_at is null')
      .leftJoin('district.capital', 'capital')
      .addSelect('capital.name')
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

  async findOne(id: number): Promise<District | null> {
    const district = await this.districtRepository.findOne({
      where: { id },
    });

    if (!district)
      throw new NotFoundException(`This district ${id} is not found`);

    return district;
  }

  async update(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
    user: Users
  ): Promise<District> {
    const { capitalid } = updateDistrictDto;

    if (capitalid) {
      const capitalExists = await this.capitalRepository.findOne({
        where: { id: capitalid },
      });

      if (!capitalExists) {
        throw new Error(`Capital with id ${capitalid} does not exist`);
      }
    }

    const district = await this.findOne(id);

    if (!district) {
      throw new Error(`District with id ${id} not found`);
    }
    district.timestamp.updatedAt = new Date();
    district.timestamp.createdBy = user;

    return this.districtRepository.save(district);
  }

  async remove(id: number): Promise<void> {
    const district = await this.findOne(id);

    await this.districtRepository.softDelete(id);
  }
}
