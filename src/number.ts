import { assertType, TypeEq } from "./utils/test";

export type Zero = [];
export type TypeNumber = 0[];

type Next<N extends TypeNumber> = [0, ...N];
type Prev<N extends TypeNumber> = N extends [0, ...infer Rest] ? Rest : Zero;

type NumToLiteral<N extends TypeNumber> = N["length"];

type LiteralToNum<N extends number> = _LiteralToNum<N, Zero>;

type _LiteralToNum<
  L extends number,
  N extends TypeNumber
> = L extends NumToLiteral<N> ? N : _LiteralToNum<L, Next<N>>;

type Add<A extends TypeNumber, B extends TypeNumber> = A extends Zero
  ? B
  : B extends Zero
  ? A
  : Add<Next<A>, Prev<B>>;

type Mul<A extends TypeNumber, B extends TypeNumber> = A extends Zero
  ? Zero
  : B extends Zero
  ? Zero
  : Add<A, Mul<A, Prev<B>>>;

export type One = Next<Zero>;
export type Two = Next<One>;
export type Three = Next<Two>;

type AlsoOne = Prev<Two>;

assertType<TypeEq<One, AlsoOne>>;

type AddResult = Add<One, Two>;
type MulResult = Mul<Two, Three>;

assertType<TypeEq<NumToLiteral<AddResult>, 3>>;

assertType<TypeEq<NumToLiteral<MulResult>, 6>>;
