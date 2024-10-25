import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoggedInDto } from './dto/logged-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({schema: {example: {username: 'u1002', password: 'changeit'}}})
  @ApiResponse({ status: 201, description: 'Login successful', type: LoggedInDto })  // Success response
  @ApiResponse({ status: 401, description: 'Unauthorized' }) 
  login(@Request() request: {user : LoggedInDto}) {
    const access_token = this.authService.login(request.user);
    return { access_token };
  }
}