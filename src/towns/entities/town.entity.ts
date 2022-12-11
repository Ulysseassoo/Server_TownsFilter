import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('towns')
export class TownsEntity {
  @PrimaryColumn({ generated: true })
  id: number;

  @Column()
  codePostal: number;

  @Column()
  codeCommune: number;

  @Column()
  nomCommune: string;

  @Column()
  libelleAcheminement: string;
}
