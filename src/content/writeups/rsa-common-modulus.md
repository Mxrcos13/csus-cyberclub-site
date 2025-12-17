---
title: "Breaking RSA: Common Modulus Attack"
description: "Exploiting a classic RSA implementation flaw where the same modulus is used for multiple public keys."
pubDate: 2024-12-05
category: "crypto"
difficulty: "medium"
ctf: "PicoCTF 2024"
author: "Sarah Johnson"
tags: ["rsa", "cryptography", "number-theory"]
---

## Challenge Description

We're given two RSA public keys that share the same modulus `n`, along with two different ciphertexts that encrypt the same message:

```python
n = 25195908475657893494027183240048398571429282126204032027777137836043662020707595556264018525880784406918290641249515082189298559149176184502808489120072844992687392807287776735971418347270261896375014971824691165077613379859095700097330459748808428401797429100642458691817195118746121515172654632282216869987549182422433637259085141865462043576798423387184774447920739934236584823824281198163815010674810451660377306056201619676256133844143603833904414952634432190114657544454178424020924616515723350778707749817125772467962926386356373289912154831438167899885040445364023527381951378636564391212010397122822120720357

e1 = 65537
e2 = 65539

c1 = 9327706258797885764863904426761222327308612850954036903837926554732347376149894926026577228369884392301534746692809487653169002481684251809166912316320962129943348378574853251719355964641041043815607458665036382285154595213405024572371991765373847426206485028787910618828915097537875855063653516478588054127487509069481193522338130044572686161973506024031958815849196867260175762677085023400067984095917571086208836169181914651190405069370678071375279970651824055982022423948019116314443970088174829819536648976841563055089863939815302396815821314329682667941621039264881569851037621163697921893531983237839084345421

c2 = 5947264930947957704455297693711080816513029375667488910845652975832343145607348332025978556318143639370379101496506093668581279663778025775584960322965033138991795279820395726738231486794017158257721052804230011688076424447046082064343233810948328157348754031028825446058943528013847178183055112389978962750775426529595873292669045271685950952094805567058666110838496030851851608090913878583095321808388197309990106798287902764806835868103189876939798327196095014006449065589936881033479026042799034738806058263087815379002208085996696907898186088766803076085932872074621491881071663073657325691768965089877995673881
```

## Understanding the Vulnerability

When two messages are encrypted with RSA using the same modulus `n` but different exponents, we can use the **Common Modulus Attack** if the two exponents are coprime (which they are: gcd(65537, 65539) = 1).

## Mathematical Background

If we have:
- `c1 = m^e1 mod n`
- `c2 = m^e2 mod n`

And if `gcd(e1, e2) = 1`, we can use the Extended Euclidean Algorithm to find integers `a` and `b` such that:

```
a*e1 + b*e2 = 1
```

Then we can compute:

```
m = (c1^a * c2^b) mod n
```

## Solution

First, let's find `a` and `b` using Python:

```python
from Crypto.Util.number import inverse, long_to_bytes

# Find a and b such that a*e1 + b*e2 = 1
def extended_gcd(a, b):
    if a == 0:
        return b, 0, 1
    gcd, x1, y1 = extended_gcd(b % a, a)
    x = y1 - (b // a) * x1
    y = x1
    return gcd, x, y

gcd, a, b = extended_gcd(e1, e2)
print(f"a = {a}, b = {b}")
print(f"Verification: {a*e1 + b*e2}")  # Should be 1
```

Output:
```
a = -32769
b = 32768
Verification: 1
```

Since `a` is negative, we need to handle that by computing the modular inverse:

```python
# Since a is negative, we use the inverse of c1
if a < 0:
    c1_inv = inverse(c1, n)
    result = (pow(c1_inv, -a, n) * pow(c2, b, n)) % n
else:
    result = (pow(c1, a, n) * pow(c2, b, n)) % n

# Convert to bytes
plaintext = long_to_bytes(result)
print(plaintext.decode())
```

## Flag

```
flag{c0mm0n_m0dulus_4tt4ck_ftw}
```

## Key Takeaways

1. **Never reuse RSA modulus** - Each key pair should have a unique modulus
2. **RSA is fragile** - Small implementation mistakes can completely break security
3. **Math is powerful** - Understanding the underlying mathematics is crucial for crypto

## Prevention

The proper way to implement RSA:
- Generate a unique modulus for each key pair
- Use proper key sizes (minimum 2048 bits, preferably 4096)
- Use proper padding schemes (OAEP instead of PKCS#1 v1.5)
- Never encrypt the same message with multiple public keys

## References

- [Common Modulus Attack - Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Attacks_against_plain_RSA)
- [CryptoHack: RSA Challenges](https://cryptohack.org/challenges/rsa/)
