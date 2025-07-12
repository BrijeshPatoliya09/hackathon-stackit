import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class MessageObject {

  @Field((type) => String, { nullable: true })
  message?: string;

  @Field((type) => Boolean, { nullable: true })
  show?: boolean;

  @Field((type) => String, { nullable: true })
  view?: string;

  @Field((type) => String, { nullable: true })
  type?: string;
}

@ObjectType()
export class ResponseMsgObject {

  @Field((type) => [MessageObject], { nullable: true })
  messages : MessageObject[]
}

@ObjectType()
export class ResponseObject {

  @Field((type) => ResponseMsgObject, { nullable: true })
  response?: ResponseMsgObject;
}
