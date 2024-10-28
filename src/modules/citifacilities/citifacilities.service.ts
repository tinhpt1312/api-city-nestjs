import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, CityFacility, Facility } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCityFacilityDto } from './dto';

@Injectable()
export class CityFacilityService {
  constructor(
    @InjectRepository(CityFacility)
    private cityFacilityRepository: Repository<CityFacility>,
    @InjectRepository(Capital) private capitalRepository: Repository<Capital>,
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
  ) {}

  async create(
    createCityFacilityDto: CreateCityFacilityDto,
  ): Promise<CityFacility> {
    const { facilityId, capitalId } = createCityFacilityDto;

    const facility = await this.facilityRepository.findOneBy({
      id: facilityId,
    });
    const capital = await this.capitalRepository.findOneBy({ id: capitalId });

    if (!facility || !capital) throw new Error('Facility or Capital not found');

    const cityFacility = new CityFacility();
    cityFacility.capital = capital;
    cityFacility.facility = facility;

    return await this.cityFacilityRepository.save(cityFacility);
  }

  async findAll() {
    return await this.cityFacilityRepository.find({
      relations: ['capital', 'facility'],
    });
  }

  async findOne(id: number): Promise<CityFacility | null> {
    return await this.cityFacilityRepository
      .createQueryBuilder('cityfacility')
      .where('cityfacility.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    const country = await this.findOne(id);
    if (!country) {
      throw new NotFoundException();
    }
    return await this.cityFacilityRepository.remove(country);
  }
}
