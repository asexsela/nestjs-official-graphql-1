import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Coffee } from "./coffee.entity";


@Entity()
@ObjectType({ description: 'Flavor model' })
export class Flavor {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    type => Coffee,
    coffee => coffee.flavors
  )
  coffees: Coffee[]
}
