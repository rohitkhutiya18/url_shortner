import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { appDataSource } from "../config/db.config.js";

@Entity("url_entity")
@Index("Idx_Original_Url", ["originalUrl"])
@Index("Idx_Short_Url", ["shortUrl"], { unique: true })
@Index("Idx_Url_Aliase", ["aliase"], { unique: true })
export class urlEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  originalUrl!: string;

  @Column({ type: "varchar", unique: true, nullable: true })
  shortUrl!: string;

  @Column({ type: "varchar", nullable: true })
  aliase!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: "timestamp" })
  expiresAt!: Date;
}
