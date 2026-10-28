import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("urls")
@Index("Idx_Original_Url", ["originalUrl"])
@Index("Idx_Short_Url", ["shortUrl"], { unique: true })
@Index("Idx_Url_Aliase", ["aliase"], { unique: true })
export class urlEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" ,name:"originalurl"})
  originalUrl!: string;

  @Column({ type: "varchar", unique: true, nullable: true ,name:"shorturl"})
  shortUrl!: string;

  @Column({ type: "varchar", nullable: true ,name:"aliase"})
  aliase!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @Column({ type: "timestamp" })
  expiresAt!: Date;
}
