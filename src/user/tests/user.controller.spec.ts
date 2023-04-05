import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from '../user.controller'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('user/profile', () => {
    it('should return userInfo"', () => {
      const reult = { user: { user: 'mock', phone: '123456', uid: '123456' } }

      expect(controller.getProfile(reult)).toBe(reult.user)
    })
  })
})
