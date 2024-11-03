package com.fil.service;

import com.fil.exceptions.AlreadyExistsException;
import com.fil.exceptions.NotFoundException;
import com.fil.model.User;

public interface UserService {

	public User login(User user) throws NotFoundException;

	public User register(User user) throws AlreadyExistsException;

	public User findUserById(int user_id) throws NotFoundException;

	public void removeUser(User toBeRemoved) throws NotFoundException;

	public User updateUser(User user) throws NotFoundException;

}
