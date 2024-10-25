import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, Country } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCountryDto, UpdateCountryDto } from './dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private countriesRepository: Repository<Country>,
    @InjectRepository(Capital) private capitalRepository: Repository<Capital>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const { name, capitalid } = createCountryDto;

    const capital = await this.capitalRepository.findOneBy({
      id: capitalid,
    });

    if (!capital) throw new Error('the city is empty');

    const newCountry = this.countriesRepository.create({
      name,
      capital,
    });

    return await this.countriesRepository.save(newCountry);
  }

  async findAll() {
    return await this.countriesRepository
      .createQueryBuilder('country')
      .leftJoin('country.capital', 'capital')
      .addSelect('capital.name')
      .getMany();
  }

  async findOne(id: number) {
    return await this.countriesRepository
      .createQueryBuilder('country')
      .leftJoin('country.capital', 'capital')
      .addSelect('capital.name')
      .where('country.id= :id', { id })
      .getOne();
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.findOne(id);

    if (!country) throw new Error('The country is empty');

    Object.assign(country, updateCountryDto);

    return await this.countriesRepository.save(country);
  }

  async remove(id: number) {
    const country = await this.findOne(id);
    if (!country) {
      throw new NotFoundException();
    }
    return await this.countriesRepository.remove(country);
  }
}
