import { Injectable } from '@nestjs/common';
import { CreateTownDto } from './dto/create-town.dto';
import { UpdateTownDto } from './dto/update-town.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { TownsEntity } from './entities/town.entity';

@Injectable()
export class TownsService {
  private _townsRepository: Repository<TownsEntity>;

  constructor(private _connection: DataSource) {
    this._townsRepository = this._connection.getRepository(TownsEntity);
  }

  async create(createTownDto: CreateTownDto) {
    const newTown = this._townsRepository.create();

    newTown.nomCommune = createTownDto.nomCommune;
    newTown.codePostal = createTownDto.codePostal;
    newTown.codeCommune = createTownDto.codeCommune;
    newTown.libelleAcheminement = createTownDto.libelleAcheminement;

    await this._townsRepository.save(newTown);
    return newTown;
  }

  async findAll() {
    return await this._townsRepository.find({
      order: {
        nomCommune: 'ASC',
      },
      take: 100,
    });
  }

  async findByFilter(nomCommune: string) {
    return await this._townsRepository.find({
      where: {
        nomCommune: Like(`${nomCommune}%`),
      },
    });
  }

  async findOne(id: number) {
    return await this._townsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTownDto: UpdateTownDto) {
    const town = await this._townsRepository.findOneOrFail({
      where: {
        id,
      },
    });

    town.codeCommune = updateTownDto.codeCommune;
    town.codePostal = updateTownDto.codePostal;
    town.libelleAcheminement = updateTownDto.libelleAcheminement;
    town.nomCommune = updateTownDto.nomCommune;

    await this._townsRepository.save(town);
    return town;
  }

  async remove(id: number) {
    await this._townsRepository.delete(id);
  }
}
