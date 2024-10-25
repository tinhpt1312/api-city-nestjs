import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, CityFacility, Facility } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateFacilitiDto, UpdateFacilitiDto } from './dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
  ) {}

  async create(createFacilityDto: CreateFacilitiDto): Promise<Facility> {
    const newFacility = this.facilityRepository.create(createFacilityDto);

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
    return await this.facilityRepository.findOne({
      where: { id },
      relations: {
        cityfacility: true,
      },
    });
  }

  async update(id: number, updateFacilityDto: UpdateFacilitiDto) {
    const facility = await this.findOne(id);

    if (!facility) throw new Error(`This facilities is not empty`);

    Object.assign(facility, updateFacilityDto);

    return await this.facilityRepository.save(facility);
  }

  async remove(id: number) {
    const facility = await this.findOne(id);

    if (!facility) throw Error('oh no! this facility is not empty!');

    return await this.facilityRepository.remove(facility);
  }
}
