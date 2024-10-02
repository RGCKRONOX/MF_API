import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
    @ApiProperty()
    success: boolean;
    @ApiProperty()
    mensaje: string;
    @ApiProperty()
    data: any;
}