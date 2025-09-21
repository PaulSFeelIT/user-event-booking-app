import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { Database } from '../config/database';

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    const db = Database.getInstance().getDataSource();
    this.repo = db.getRepository(User);
  }

  async create(name: string, email: string): Promise<User> {
    const user = this.repo.create({ name, email });
    return this.repo.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOneBy({ email });
  }
}
