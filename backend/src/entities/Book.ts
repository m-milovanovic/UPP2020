import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Writer } from "./Writer";


@Entity()
export class Book extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  extension: string;

  @ManyToOne(() => Writer, writer => writer.books)
  writer: Writer;


  getFullName() {
    return this.writer.getFullName() + ' - ' + this.name + '.' + this.extension;
  }

  getFullNameWithoutExt() {
    return this.writer.getFullName() + ' - ' + this.name;
  }

  constructor(book?: {
    name: string,
    extension: string,
    writer: Writer
  }) {
    super();
    if (book) {
      this.name = book.name;
      this.extension = book.extension;
      this.writer = book.writer
    }
  }
}