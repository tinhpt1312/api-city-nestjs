import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, District } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateDistrictDto } from './dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Capital) private capitalRepository: Repository<Capital>,
  ) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const { name, capitalid } = createDistrictDto;

    const capital = await this.capitalRepository.findOneBy({
      id: capitalid,
    });

    if (!capital) throw new Error('the city is empty');

    const newDistrict = this.districtRepository.create({
      name,
      capital,
    });

    return await this.districtRepository.save(newDistrict);
  }

  async findAll() {
    return this.districtRepository.find();
  }
}
