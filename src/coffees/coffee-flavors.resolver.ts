import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Flavor } from "./entities/flavor.entity";
import { Coffee } from "./entities/coffee.entity";
import { FlavorsByCoffeeLoader } from "./data-loader/flavors-by-coffee.loader";

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader, // 👈 utilize our new loader
  ) {}

  @ResolveField('flavors', () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee): Promise<Flavor[]> {
    return this.flavorsByCoffeeLoader.load(coffee.id); // 👈
  }
}
