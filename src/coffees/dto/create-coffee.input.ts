import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { CoffeeType } from "../../common/enums/coffee-type.enum";

@InputType({description: 'Create coffee input object type'})
export class CreateCoffeeInput {
  @MinLength(3)
  @Field({description: 'A new coffee name'})
  name: string;
  brand: string;
  flavors: string[];
  type: CoffeeType;
}
