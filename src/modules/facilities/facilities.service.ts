import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityFacility, Facility, Users } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateFacilitiDto, UpdateFacilitiDto } from './dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
    @InjectRepository(CityFacility)
    private cityFacilityRepository: Repository<CityFacility>,
  ) {}

  async create(
    createFacilityDto: CreateFacilitiDto,
    user: Users,
  ): Promise<Facility> {
    const { name } = createFacilityDto;

    const newFacility = new Facility();
    newFacility.name = name;
    newFacility.timestamp.createdBy = user;

    return await this.facilityRepository.save(newFacility);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [result, total] = await this.facilityRepository
      .createQueryBuilder('facility')
      .where('facility.deleted_at is null')
      .leftJoinAndSelect('facility.cityfacilities', 'cityfacilities')
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
    return await this.facilityRepository
      .createQueryBuilder('facility')
      .where('facility.deleted_at is null')
      .leftJoinAndSelect('facility.cityfacilities', 'cityfacilities')
      .where('facility.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateFacilityDto: UpdateFacilitiDto, user: Users) {
    const facility = await this.findOne(id);

    if (!facility) throw new Error(`This facilities is not empty`);

    facility.timestamp.updatedBy = user;

    return await this.facilityRepository.save({ ...updateFacilityDto, id });
  }

  async remove(id: number): Promise<void> {
    const facility = await this.findOne(id);

    if (!facility) throw Error('Oh no! This facility does not exist!');

    await this.cityFacilityRepository.delete({ facility: { id: facility.id } });

    await this.facilityRepository.softDelete(facility.id);
  }
}
