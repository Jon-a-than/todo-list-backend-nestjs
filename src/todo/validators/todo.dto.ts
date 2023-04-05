import {
  IsNotEmpty,
  IsOptional,
  IsNumberString,
  Length,
  IsBoolean,
  MaxLength,
  Min,
  IsInt,
  IsNumber,
  Max,
  IsMongoId,
} from 'class-validator'
import { Types } from 'mongoose'

export class GetListDto {
  @IsNotEmpty({ message: 'limit参数为空' })
  @IsNumberString({}, { message: 'limit类型错误' })
  @MaxLength(2, { message: '超出最大查询数' })
  limit: string

  @IsNotEmpty({ message: 'type参数为空' })
  @IsNumberString({}, { message: 'type参数错误' })
  type: string

  @IsNotEmpty({ message: 'distribution参数为空' })
  @IsOptional()
  @IsNumberString({}, { message: 'distribution应为数字' })
  @Length(9, 9, { message: 'distribution参数错误' })
  distribution: string
}

export class CreateTodoDto {
  @IsNotEmpty({ message: 'title为空' })
  @Length(1, 50, { message: 'title长度错误' })
  title: string

  @IsNotEmpty({ message: 'type为空' })
  @IsInt({ message: 'type应为整型' })
  type: number

  @IsOptional()
  @IsNumberString({}, { message: 'distribution应为数字' })
  @Length(9, 9, { message: 'distribution参数错误' })
  distribution?: string

  @IsOptional()
  @IsBoolean({ message: 'important参数错误' })
  important?: boolean

  @IsOptional()
  @MaxLength(300, { message: 'description长度溢出' })
  description?: string

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'endTime应为数字' },
  )
  @Min(100_000_000_000, { message: 'endTime过小' })
  @Max(300_000_000_000, { message: 'endTime过大' })
  endTime?: number
}

export class ListIdDto {
  @IsNotEmpty({ message: 'id 不可为空' })
  @IsMongoId({ message: 'id 参数错误' })
  id: Types.ObjectId
}

export class UpdateTodoDto extends ListIdDto {
  @IsOptional()
  @Length(1, 50, { message: 'title长度错误' })
  title?: string

  @IsOptional()
  @IsInt({ message: 'type应为整型' })
  type?: number

  @IsOptional()
  @IsNumberString({}, { message: 'distribution应为数字' })
  @Length(9, 9, { message: 'distribution参数错误' })
  distribution?: string

  @IsOptional()
  @IsBoolean({ message: 'important参数错误' })
  important?: boolean

  @IsOptional()
  @MaxLength(300, { message: 'description长度溢出' })
  description?: string

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'endTime应为数字' },
  )
  @Min(100_000_000_000, { message: 'endTime过小' })
  @Max(300_000_000_000, { message: 'endTime过大' })
  endTime?: number
}
