import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capital, District } from 'src/entities';
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

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const { name, capitalid } = createDistrictDto;

    const capital = await this.findCapitalById(capitalid);

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
  ): Promise<District> {
    const { capitalid } = updateDistrictDto;

    // Kiểm tra tính hợp lệ của `capitalId` trong bảng `capital`
    if (capitalid) {
      const capitalExists = await this.capitalRepository.findOne({
        where: { id: capitalid },
      });

      if (!capitalExists) {
        throw new Error(`Capital with id ${capitalid} does not exist`);
      }
    }

    // Tìm district cần cập nhật
    const district = await this.findOne(id);

    if (!district) {
      throw new Error(`District with id ${id} not found`);
    }

    // Gộp dữ liệu cũ và mới, sau đó lưu vào cơ sở dữ liệu
    const updatedDistrict = { ...district, ...updateDistrictDto, id };
    return this.districtRepository.save(updatedDistrict);
  }

  async remove(id: number) {
    const district = await this.findOne(id);

    if (!district) {
      throw new NotFoundException();
    }

    return await this.districtRepository.remove(district);
  }
}
