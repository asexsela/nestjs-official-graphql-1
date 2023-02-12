import { Args, ID, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { Coffee } from "./entities/coffee.entity";
import { ParseIntPipe } from "@nestjs/common";
import { CreateCoffeeInput } from "./dto/create-coffee.input";
import { CoffeesService } from "./coffees.service";
import { UpdateCoffeeInput } from "./dto/update-coffee.input";
import { PubSub } from "graphql-subscriptions";

@Resolver()
export class CoffeesResolver {

  constructor(
    private readonly coffeeService: CoffeesService,
    private readonly pubSub: PubSub
  ) {}
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return this.coffeeService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee', nullable: true })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee', nullable: true })
  async create(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput) {
    return this.coffeeService.create(createCoffeeInput);
  }

  @Mutation(() => Coffee, {name: 'updateCoffee', nullable: true})
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') dto: UpdateCoffeeInput
  ) {
    return this.coffeeService.update(id, dto)
  }


  @Mutation(() => Coffee, {name: 'removeCoffee', nullable: true})
  async remove(
    @Args('id', ParseIntPipe) id: number
  ) {
    return this.coffeeService.remove(id);
  }

  @Subscription(() => Coffee)
  coffeeAdded() {
    return this.pubSub.asyncIterator('coffeeAdded');
  }
}
