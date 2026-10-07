import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class urlEntity {
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column()
    title!:string;

    @Column({ type: "bigint", unique: true })
    shortId!: string;

    @Column()
    originalUrl!: string;

    @Column()
    shortUrl!: string;

    @Column({nullable: true})
    alias!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    expiresAt!: Date;

}
