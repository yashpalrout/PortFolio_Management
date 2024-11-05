package com.fil.service.impl;

import com.fil.exceptions.AlreadyExistsException;
import com.fil.exceptions.NotFoundException;
import com.fil.interfaces.TextHasher;
import com.fil.model.User;
import com.fil.repo.UserRepo;
import com.fil.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    TextHasher hasher;

    @Override
    public User login(User data) throws NotFoundException {
        Optional<User> optUser = userRepo.findByEmail(data.getEmail());
        if (optUser.isEmpty()) {
            throw new NotFoundException();
        }

        boolean passwordMatched = hasher.verifyHash(data.getPassword(), optUser.get().getPassword());
        if (!passwordMatched) {
            throw new NotFoundException();
        }
        return optUser.get();
    }

    @Override
    public User register(User data) throws AlreadyExistsException {
        Optional<User> optUser = userRepo.findByEmail(data.getEmail());
        if (optUser.isPresent()) {
            throw new AlreadyExistsException();
        }
        userRepo.save(data);
        return data;

    }

    @Override
    public User findUserById(int user_id) throws NotFoundException {
        return userRepo.findById(user_id).orElseThrow(() -> new NotFoundException());
    }

    @Override
    public void removeUser(User toBeRemoved) throws NotFoundException {
        Optional<User> optUser = userRepo.findById(toBeRemoved.getUserId());

        if (optUser.isEmpty()) {
            throw new NotFoundException();
        }

        userRepo.delete(toBeRemoved);
    }

    @Override
    public void updateUser(User user) throws NotFoundException {
        System.out.println(user);

        Optional<User> optUser = userRepo.findById(user.getUserId());

        if (optUser.isEmpty()) {
            throw new NotFoundException();
        }
        userRepo.save(user);
    }

    @Override
    public boolean verifyPassword(User user, String oldPassword) {
        System.out.println(user.getPassword());
        System.out.println(oldPassword);
        System.out.println(hasher.verifyHash(oldPassword, user.getPassword()));
        return hasher.verifyHash(oldPassword, user.getPassword());
    }

    @Override
    public List<User> listAllUsers() {
        return userRepo.findAll();
    }

}
