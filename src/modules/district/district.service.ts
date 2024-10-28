import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, District } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateDistrictDto, UpdateDistrictDto } from './dto';

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
    return this.districtRepository
      .createQueryBuilder('district')
      .leftJoin('district.capital', 'capital')
      .addSelect('capital.name')
      .getMany();
  }

  async findOne(id: number) {
    return await this.districtRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const district = await this.findOne(id);

    if (!district) throw new Error('The district is empty');

    Object.assign(district, updateDistrictDto);

    return await this.districtRepository.save(district);
  }

  async remove(id: number) {
    const district = await this.findOne(id);
    if (!district) {
      throw new NotFoundException();
    }
    return await this.districtRepository.remove(district);
  }
}
