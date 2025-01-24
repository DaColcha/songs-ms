import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto';
import { UpdateSongDto } from './dto';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  create(createSongDto: CreateSongDto) {
    const song = this.songRepository.create(createSongDto);
    return this.songRepository.save(song);
  }

  findAll() {
    return this.songRepository.find();
  }

  findOne(id: number) {
    const song = this.songRepository.findOne({
      where: { id },
    });

    if (!song) {
      throw new NotFoundException(`Song #${id} not found`);
    }

    return song;
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    const song = this.findOne(id);

    if (!song) {
      throw new NotFoundException(`Song #${id} not found`);
    }

    await this.songRepository.update(id, updateSongDto);
    return { mesage: `Song #${id} updated` };
  }

  async remove(id: number) {
    const song = this.findOne(id);

    if (!song) {
      throw new NotFoundException(`Song #${id} not found`);
    }

    await this.songRepository.delete(id);

    return { message: `Song #${id} deleted` };
  }
}
