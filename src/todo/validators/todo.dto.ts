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
} from 'class-validator'

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
