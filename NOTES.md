# Lecture notes

## Rule 1

**NEVER**

**EVER**

**EVER**

send user credentials in URLs/query strings!

## Hashing functions

Takes an input and returns a set length string. The string is unreversable and deterministic (for the same input, you always get the same output).
The returned string is nothing like the input string.

Even slightly different inputs (capitalized letter) produces completly different output.

It should be unfeasable to find a collision.

**Collision** can happen because - imagine you want to has all information in the world (trillions of inputs), but your has function returns a string of fixed length
 of let's say 10 digits. At some point, you will run out of 'hashes' and two inputs will end up with the same output hash string. This is called a * collision*.


 ## Salts

 Randomly generated string, that is concatenated to the password before hasing. Once it's hashes, it can be concatenated to the hash and saved to the DB.

 When a user wants to log in, you separate the hash and the salt from the DB data, concat the salt with users password, hash it and compare it with the hash saved in the DB.

 It doesn't matter, that the salt is stored in the DB with hashed pw, because it would mean for the attacker to create a Rainbow Table for every single user. Because every user has unique random salt. This would make the attack unfeasible.

**Example:**
```
// user register:
const username = peter;
const password = mypassword123;
```
Users credentials are hashed with random salt before storing in DB:

```
const randomSalt = s@Lt; // a random string of certain lenght (in this case 4). randomly generated and unique for every user

const hashedPassword = hash(randomSalt + password);

const passwordToStoreInDb = randomSalt + hashedPassword;
// db().insert({username, password:"passwordToStoreInDb})
```

Then, when user tries to LOG IN:

```
const username = peter;
const password = mypassword123;

const findUserInDbBasedOnUsername = db().where('username', username);

const savedHashedPwFromDb = findUserInDbBasedOnUsername.password;

// separate salt and hash
const saltFromDb = // get the first 4 letters (salt lenght) from savedHashedPwFromDb
const hashedPasswordFromDb = // get the last characters from savedHashedPwFromDb

const isUserLoginPasswordCorrect = hash(saltFromDb + password) === hashedPasswordFromDb  // true or false
```

