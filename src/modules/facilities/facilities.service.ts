import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, CityFacility, Facility, Users } from 'src/entities';
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

    const newFacility = this.facilityRepository.create({
      name,
      createdBy: user,
    });

    return await this.facilityRepository.save(newFacility);
  }

  async findAll() {
    return await this.facilityRepository.find({
      relations: {
        cityfacility: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.facilityRepository
      .createQueryBuilder('facility')
      .leftJoinAndSelect('facility.cityfacility', 'cityfacility')
      .where('facility.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateFacilityDto: UpdateFacilitiDto) {
    const facility = await this.findOne(id);

    if (!facility) throw new Error(`This facilities is not empty`);

    return await this.facilityRepository.save({ ...updateFacilityDto, id });
  }

  async remove(id: number): Promise<void> {
    const facility = await this.findOne(id);

    if (!facility) throw Error('Oh no! This facility does not exist!');

    await this.cityFacilityRepository.delete({ facility: { id: facility.id } });

    await this.facilityRepository.softDelete(facility.id);
  }
}
