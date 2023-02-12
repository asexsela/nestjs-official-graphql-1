import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";
import { Drink } from "../../common/interfaces/drink.interface";
import { CoffeeType } from "../../common/enums/coffee-type.enum";
import { loggerMiddleware } from "../../common/middleware/logger.middleware";


@Entity()
@ObjectType({ description: 'Coffee model', implements: () => Drink })
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(type => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({middleware: [loggerMiddleware]})
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(
    type => Flavor,
    flavor => flavor.coffees,
    {
      cascade: true,
    },
  )
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({nullable: true})
  type?: CoffeeType;
}
