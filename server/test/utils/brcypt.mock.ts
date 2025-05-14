jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashed-password'),
}));

import bcrypt from 'bcryptjs';

export const mockBcrypt = ({
  compare = true,
  hash = 'hashed-password',
}: {
  compare?: boolean;
  hash?: string;
}): void => {
  (bcrypt.compare as jest.Mock).mockResolvedValue(compare);
  (bcrypt.hash as jest.Mock).mockResolvedValue(hash);
};
