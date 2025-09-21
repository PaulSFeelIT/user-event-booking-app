import { Request, Response, Router } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { DuplicateEmailException } from '../exceptions/DuplicateEmailException';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';
import { ValidationException } from '../exceptions/ValidationException';

export class UserController {
  public router: Router;

  constructor(private userService: UserService) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/', this.createUser.bind(this));
    this.router.get('/:userId', this.getUserById.bind(this));
    this.router.get('/', this.getUserByEmail.bind(this));
  }

  async createUser(req: Request, res: Response) {
    const dto: CreateUserDto = req.body as CreateUserDto;

    try {
      const user = await this.userService.create(dto.name, dto.email);

      res.status(201).json(user);
    } catch (err) {
      if (
        err instanceof DuplicateEmailException ||
        err instanceof ValidationException
      ) {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await this.userService.getById(userId);

      res.json(user);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    const email = req.query.email as string;

    try {
      const user = await this.userService.getByEmail(email);

      res.json(user);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
