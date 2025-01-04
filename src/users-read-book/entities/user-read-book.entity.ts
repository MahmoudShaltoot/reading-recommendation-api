import { Book } from "src/books/entities/book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserReadBook {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.usersReadBooks)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    public user: User;
    
    @ManyToOne(() => Book, (book) => book.usersReadBooks)
    @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
    public book: Book;

    @Column({ nullable: false })
    start_page: number;
    
    @Column({ nullable: false })
    end_page: number;
    
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
