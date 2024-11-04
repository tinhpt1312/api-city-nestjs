import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, Country, Users } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCountryDto, UpdateCountryDto } from './dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private countriesRepository: Repository<Country>,
    @InjectRepository(Capital) private capitalRepository: Repository<Capital>,
  ) {}

  private async checkCapitalExists(capitalId: number): Promise<Capital> {
    const capital = await this.capitalRepository.findOneBy({ id: capitalId });
    if (!capital) {
      throw new NotFoundException('The city is empty');
    }
    return capital;
  }

  async create(
    createCountryDto: CreateCountryDto,
    user: Users,
  ): Promise<Country> {
    const { name, capitalid } = createCountryDto;

    const capital = await this.checkCapitalExists(capitalid);

    const newCountry = await this.capitalRepository.save({
      name,
      capital,
      timestamp: { createdBy: user },
    });

    return await this.countriesRepository.save(newCountry);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [result, total] = await this.countriesRepository
      .createQueryBuilder('country')
      .where('country.deleted_at is null')
      .leftJoin('country.capital', 'capital')
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

  async findOne(id: number) {
    const country = await this.countriesRepository
      .createQueryBuilder('country')
      .where('country.deleted_at is null')
      .leftJoinAndSelect('country.capital', 'capital')
      .where('country.id = :id', { id })
      .getOne();

    if (!country) {
      throw new NotFoundException('The country is empty');
    }
    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto, user: Users) {
    const country = await this.findOne(id);

    Object.assign(country, updateCountryDto);

    country.timestamp.updatedAt = new Date();
    country.timestamp.updatedBy = user;

    return await this.countriesRepository.save(country);
  }

  async remove(id: number) {
    const country = await this.findOne(id);

    return await this.countriesRepository.softDelete(id);
  }
}
