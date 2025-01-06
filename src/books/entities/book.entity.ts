import { UserReadBook } from "src/users-read-book/entities/user-read-book.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({ nullable: false })
    num_of_pages: number;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => UserReadBook, (usersReadBook) => usersReadBook.book)
    usersReadBooks: UserReadBook[];
}
