
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CustomField
 * 
 */
export type CustomField = $Result.DefaultSelection<Prisma.$CustomFieldPayload>
/**
 * Model QuotationItem
 * 
 */
export type QuotationItem = $Result.DefaultSelection<Prisma.$QuotationItemPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Quotation
 * 
 */
export type Quotation = $Result.DefaultSelection<Prisma.$QuotationPayload>
/**
 * Model OfficialQuotation
 * 
 */
export type OfficialQuotation = $Result.DefaultSelection<Prisma.$OfficialQuotationPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>
/**
 * Model Portfolio
 * 
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>
/**
 * Model Settings
 * 
 */
export type Settings = $Result.DefaultSelection<Prisma.$SettingsPayload>
/**
 * Model Testimonial
 * 
 */
export type Testimonial = $Result.DefaultSelection<Prisma.$TestimonialPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  user: 'user',
  admin: 'admin'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Category: {
  residential: 'residential',
  corporate: 'corporate',
  premium: 'premium'
};

export type Category = (typeof Category)[keyof typeof Category]


export const ProductStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DRAFT: 'DRAFT'
};

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus]


export const QuotationStatus: {
  pending: 'pending',
  reviewed: 'reviewed',
  accepted: 'accepted'
};

export type QuotationStatus = (typeof QuotationStatus)[keyof typeof QuotationStatus]


export const EmployeeStatus: {
  active: 'active',
  inactive: 'inactive'
};

export type EmployeeStatus = (typeof EmployeeStatus)[keyof typeof EmployeeStatus]


export const AttendanceStatus: {
  full: 'full',
  half: 'half',
  holiday: 'holiday',
  hourly: 'hourly',
  absent: 'absent',
  full_day: 'full_day',
  half_day: 'half_day',
  one_five_days: 'one_five_days',
  two_days: 'two_days'
};

export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus]


export const ReviewStatus: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Category = $Enums.Category

export const Category: typeof $Enums.Category

export type ProductStatus = $Enums.ProductStatus

export const ProductStatus: typeof $Enums.ProductStatus

export type QuotationStatus = $Enums.QuotationStatus

export const QuotationStatus: typeof $Enums.QuotationStatus

export type EmployeeStatus = $Enums.EmployeeStatus

export const EmployeeStatus: typeof $Enums.EmployeeStatus

export type AttendanceStatus = $Enums.AttendanceStatus

export const AttendanceStatus: typeof $Enums.AttendanceStatus

export type ReviewStatus = $Enums.ReviewStatus

export const ReviewStatus: typeof $Enums.ReviewStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quotation`: Exposes CRUD operations for the **Quotation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quotations
    * const quotations = await prisma.quotation.findMany()
    * ```
    */
  get quotation(): Prisma.QuotationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.officialQuotation`: Exposes CRUD operations for the **OfficialQuotation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfficialQuotations
    * const officialQuotations = await prisma.officialQuotation.findMany()
    * ```
    */
  get officialQuotation(): Prisma.OfficialQuotationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolio`: Exposes CRUD operations for the **Portfolio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portfolios
    * const portfolios = await prisma.portfolio.findMany()
    * ```
    */
  get portfolio(): Prisma.PortfolioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.settings`: Exposes CRUD operations for the **Settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.settings.findMany()
    * ```
    */
  get settings(): Prisma.SettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testimonial`: Exposes CRUD operations for the **Testimonial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Testimonials
    * const testimonials = await prisma.testimonial.findMany()
    * ```
    */
  get testimonial(): Prisma.TestimonialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Product: 'Product',
    Quotation: 'Quotation',
    OfficialQuotation: 'OfficialQuotation',
    Employee: 'Employee',
    Attendance: 'Attendance',
    Portfolio: 'Portfolio',
    Settings: 'Settings',
    Testimonial: 'Testimonial',
    Review: 'Review'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "product" | "quotation" | "officialQuotation" | "employee" | "attendance" | "portfolio" | "settings" | "testimonial" | "review"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ProductFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ProductAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Quotation: {
        payload: Prisma.$QuotationPayload<ExtArgs>
        fields: Prisma.QuotationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuotationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuotationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          findFirst: {
            args: Prisma.QuotationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuotationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          findMany: {
            args: Prisma.QuotationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>[]
          }
          create: {
            args: Prisma.QuotationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          createMany: {
            args: Prisma.QuotationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.QuotationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          update: {
            args: Prisma.QuotationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          deleteMany: {
            args: Prisma.QuotationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuotationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuotationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          aggregate: {
            args: Prisma.QuotationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuotation>
          }
          groupBy: {
            args: Prisma.QuotationGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuotationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.QuotationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.QuotationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.QuotationCountArgs<ExtArgs>
            result: $Utils.Optional<QuotationCountAggregateOutputType> | number
          }
        }
      }
      OfficialQuotation: {
        payload: Prisma.$OfficialQuotationPayload<ExtArgs>
        fields: Prisma.OfficialQuotationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfficialQuotationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialQuotationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfficialQuotationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialQuotationPayload>
          }
          findFirst: {
            args: Prisma.OfficialQuotationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialQuotationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfficialQuotationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialQuotationPayload>
          }
          findMany: {
            args: Prisma.OfficialQuotationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialQuotationPayload>[]
          }
          create: {
            args: Prisma.OfficialQuotationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialQuotationPayload>
          }
          createMany: {
            args: Prisma.OfficialQuotationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OfficialQuotationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialQuotationPayload>
          }
          update: {
            args: Prisma.OfficialQuotationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialQuotationPayload>
          }
          deleteMany: {
            args: Prisma.OfficialQuotationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfficialQuotationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OfficialQuotationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialQuotationPayload>
          }
          aggregate: {
            args: Prisma.OfficialQuotationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfficialQuotation>
          }
          groupBy: {
            args: Prisma.OfficialQuotationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfficialQuotationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OfficialQuotationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OfficialQuotationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OfficialQuotationCountArgs<ExtArgs>
            result: $Utils.Optional<OfficialQuotationCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.EmployeeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.EmployeeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AttendanceFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AttendanceAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
      Portfolio: {
        payload: Prisma.$PortfolioPayload<ExtArgs>
        fields: Prisma.PortfolioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findFirst: {
            args: Prisma.PortfolioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findMany: {
            args: Prisma.PortfolioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          create: {
            args: Prisma.PortfolioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          createMany: {
            args: Prisma.PortfolioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PortfolioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          update: {
            args: Prisma.PortfolioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PortfolioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          aggregate: {
            args: Prisma.PortfolioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolio>
          }
          groupBy: {
            args: Prisma.PortfolioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PortfolioFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PortfolioAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PortfolioCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioCountAggregateOutputType> | number
          }
        }
      }
      Settings: {
        payload: Prisma.$SettingsPayload<ExtArgs>
        fields: Prisma.SettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findFirst: {
            args: Prisma.SettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findMany: {
            args: Prisma.SettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          create: {
            args: Prisma.SettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          createMany: {
            args: Prisma.SettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          update: {
            args: Prisma.SettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          deleteMany: {
            args: Prisma.SettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          aggregate: {
            args: Prisma.SettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettings>
          }
          groupBy: {
            args: Prisma.SettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SettingsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SettingsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SettingsCountAggregateOutputType> | number
          }
        }
      }
      Testimonial: {
        payload: Prisma.$TestimonialPayload<ExtArgs>
        fields: Prisma.TestimonialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestimonialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestimonialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          findFirst: {
            args: Prisma.TestimonialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestimonialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          findMany: {
            args: Prisma.TestimonialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>[]
          }
          create: {
            args: Prisma.TestimonialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          createMany: {
            args: Prisma.TestimonialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TestimonialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          update: {
            args: Prisma.TestimonialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          deleteMany: {
            args: Prisma.TestimonialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestimonialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TestimonialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          aggregate: {
            args: Prisma.TestimonialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestimonial>
          }
          groupBy: {
            args: Prisma.TestimonialGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestimonialGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TestimonialFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TestimonialAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TestimonialCountArgs<ExtArgs>
            result: $Utils.Optional<TestimonialCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ReviewFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ReviewAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    product?: ProductOmit
    quotation?: QuotationOmit
    officialQuotation?: OfficialQuotationOmit
    employee?: EmployeeOmit
    attendance?: AttendanceOmit
    portfolio?: PortfolioOmit
    settings?: SettingsOmit
    testimonial?: TestimonialOmit
    review?: ReviewOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    quotations: number
    reviews: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotations?: boolean | UserCountOutputTypeCountQuotationsArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQuotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    quotations: number
    portfolios: number
    testimonials: number
    reviews: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotations?: boolean | ProductCountOutputTypeCountQuotationsArgs
    portfolios?: boolean | ProductCountOutputTypeCountPortfoliosArgs
    testimonials?: boolean | ProductCountOutputTypeCountTestimonialsArgs
    reviews?: boolean | ProductCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountQuotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountPortfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountTestimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestimonialWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    attendance: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | EmployeeCountOutputTypeCountAttendanceArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CustomField
   */





  export type CustomFieldSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    label?: boolean
    value?: boolean
  }, ExtArgs["result"]["customField"]>



  export type CustomFieldSelectScalar = {
    label?: boolean
    value?: boolean
  }

  export type CustomFieldOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"label" | "value", ExtArgs["result"]["customField"]>

  export type $CustomFieldPayload = {
    name: "CustomField"
    objects: {}
    scalars: {
      label: string
      value: string
    }
    composites: {}
  }

  type CustomFieldGetPayload<S extends boolean | null | undefined | CustomFieldDefaultArgs> = $Result.GetResult<Prisma.$CustomFieldPayload, S>





  /**
   * Fields of the CustomField model
   */
  interface CustomFieldFieldRefs {
    readonly label: FieldRef<"CustomField", 'String'>
    readonly value: FieldRef<"CustomField", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CustomField without action
   */
  export type CustomFieldDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomField
     */
    select?: CustomFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomField
     */
    omit?: CustomFieldOmit<ExtArgs> | null
  }


  /**
   * Model QuotationItem
   */





  export type QuotationItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    description?: boolean
    rate?: boolean
    quantity?: boolean
    amount?: boolean
  }, ExtArgs["result"]["quotationItem"]>



  export type QuotationItemSelectScalar = {
    description?: boolean
    rate?: boolean
    quantity?: boolean
    amount?: boolean
  }

  export type QuotationItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"description" | "rate" | "quantity" | "amount", ExtArgs["result"]["quotationItem"]>

  export type $QuotationItemPayload = {
    name: "QuotationItem"
    objects: {}
    scalars: {
      description: string
      rate: number
      quantity: number
      amount: number
    }
    composites: {}
  }

  type QuotationItemGetPayload<S extends boolean | null | undefined | QuotationItemDefaultArgs> = $Result.GetResult<Prisma.$QuotationItemPayload, S>





  /**
   * Fields of the QuotationItem model
   */
  interface QuotationItemFieldRefs {
    readonly description: FieldRef<"QuotationItem", 'String'>
    readonly rate: FieldRef<"QuotationItem", 'Float'>
    readonly quantity: FieldRef<"QuotationItem", 'Int'>
    readonly amount: FieldRef<"QuotationItem", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * QuotationItem without action
   */
  export type QuotationItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    image: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    image: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    image: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    image: string | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quotations?: boolean | User$quotationsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "image" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotations?: boolean | User$quotationsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      quotations: Prisma.$QuotationPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      image: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quotations<T extends User$quotationsArgs<ExtArgs> = {}>(args?: Subset<T, User$quotationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.quotations
   */
  export type User$quotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    where?: QuotationWhereInput
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    cursor?: QuotationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
    mrp: number | null
    discountPercentage: number | null
    stock: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
    mrp: number | null
    discountPercentage: number | null
    stock: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: $Enums.Category | null
    subCategory: string | null
    sku: string | null
    slug: string | null
    status: $Enums.ProductStatus | null
    imageUrl: string | null
    price: number | null
    mrp: number | null
    discountPercentage: number | null
    stock: number | null
    companyName: string | null
    isBestProduct: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: $Enums.Category | null
    subCategory: string | null
    sku: string | null
    slug: string | null
    status: $Enums.ProductStatus | null
    imageUrl: string | null
    price: number | null
    mrp: number | null
    discountPercentage: number | null
    stock: number | null
    companyName: string | null
    isBestProduct: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    title: number
    description: number
    category: number
    subCategory: number
    sku: number
    slug: number
    status: number
    imageUrl: number
    additionalImages: number
    price: number
    mrp: number
    discountPercentage: number
    stock: number
    companyName: number
    isBestProduct: number
    bundleProductIds: number
    relatedProductIds: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
    mrp?: true
    discountPercentage?: true
    stock?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
    mrp?: true
    discountPercentage?: true
    stock?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    subCategory?: true
    sku?: true
    slug?: true
    status?: true
    imageUrl?: true
    price?: true
    mrp?: true
    discountPercentage?: true
    stock?: true
    companyName?: true
    isBestProduct?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    subCategory?: true
    sku?: true
    slug?: true
    status?: true
    imageUrl?: true
    price?: true
    mrp?: true
    discountPercentage?: true
    stock?: true
    companyName?: true
    isBestProduct?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    subCategory?: true
    sku?: true
    slug?: true
    status?: true
    imageUrl?: true
    additionalImages?: true
    price?: true
    mrp?: true
    discountPercentage?: true
    stock?: true
    companyName?: true
    isBestProduct?: true
    bundleProductIds?: true
    relatedProductIds?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    title: string
    description: string
    category: $Enums.Category
    subCategory: string | null
    sku: string | null
    slug: string | null
    status: $Enums.ProductStatus
    imageUrl: string
    additionalImages: string[]
    price: number | null
    mrp: number | null
    discountPercentage: number | null
    stock: number
    companyName: string | null
    isBestProduct: boolean
    bundleProductIds: string[]
    relatedProductIds: string[]
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    subCategory?: boolean
    sku?: boolean
    slug?: boolean
    status?: boolean
    imageUrl?: boolean
    additionalImages?: boolean
    price?: boolean
    mrp?: boolean
    discountPercentage?: boolean
    stock?: boolean
    companyName?: boolean
    isBestProduct?: boolean
    customFields?: boolean | CustomFieldDefaultArgs<ExtArgs>
    bundleProductIds?: boolean
    relatedProductIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quotations?: boolean | Product$quotationsArgs<ExtArgs>
    portfolios?: boolean | Product$portfoliosArgs<ExtArgs>
    testimonials?: boolean | Product$testimonialsArgs<ExtArgs>
    reviews?: boolean | Product$reviewsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>



  export type ProductSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    subCategory?: boolean
    sku?: boolean
    slug?: boolean
    status?: boolean
    imageUrl?: boolean
    additionalImages?: boolean
    price?: boolean
    mrp?: boolean
    discountPercentage?: boolean
    stock?: boolean
    companyName?: boolean
    isBestProduct?: boolean
    bundleProductIds?: boolean
    relatedProductIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "category" | "subCategory" | "sku" | "slug" | "status" | "imageUrl" | "additionalImages" | "price" | "mrp" | "discountPercentage" | "stock" | "companyName" | "isBestProduct" | "customFields" | "bundleProductIds" | "relatedProductIds" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotations?: boolean | Product$quotationsArgs<ExtArgs>
    portfolios?: boolean | Product$portfoliosArgs<ExtArgs>
    testimonials?: boolean | Product$testimonialsArgs<ExtArgs>
    reviews?: boolean | Product$reviewsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      quotations: Prisma.$QuotationPayload<ExtArgs>[]
      portfolios: Prisma.$PortfolioPayload<ExtArgs>[]
      testimonials: Prisma.$TestimonialPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      category: $Enums.Category
      subCategory: string | null
      sku: string | null
      slug: string | null
      status: $Enums.ProductStatus
      imageUrl: string
      additionalImages: string[]
      price: number | null
      mrp: number | null
      discountPercentage: number | null
      stock: number
      companyName: string | null
      isBestProduct: boolean
      bundleProductIds: string[]
      relatedProductIds: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {
      customFields: Prisma.$CustomFieldPayload[]
    }
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * @param {ProductFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const product = await prisma.product.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ProductFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Product.
     * @param {ProductAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const product = await prisma.product.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ProductAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quotations<T extends Product$quotationsArgs<ExtArgs> = {}>(args?: Subset<T, Product$quotationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    portfolios<T extends Product$portfoliosArgs<ExtArgs> = {}>(args?: Subset<T, Product$portfoliosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testimonials<T extends Product$testimonialsArgs<ExtArgs> = {}>(args?: Subset<T, Product$testimonialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Product$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Product$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly title: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'Category'>
    readonly subCategory: FieldRef<"Product", 'String'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly status: FieldRef<"Product", 'ProductStatus'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly additionalImages: FieldRef<"Product", 'String[]'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly mrp: FieldRef<"Product", 'Float'>
    readonly discountPercentage: FieldRef<"Product", 'Float'>
    readonly stock: FieldRef<"Product", 'Int'>
    readonly companyName: FieldRef<"Product", 'String'>
    readonly isBestProduct: FieldRef<"Product", 'Boolean'>
    readonly bundleProductIds: FieldRef<"Product", 'String[]'>
    readonly relatedProductIds: FieldRef<"Product", 'String[]'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product findRaw
   */
  export type ProductFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Product aggregateRaw
   */
  export type ProductAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Product.quotations
   */
  export type Product$quotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    where?: QuotationWhereInput
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    cursor?: QuotationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Product.portfolios
   */
  export type Product$portfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Product.testimonials
   */
  export type Product$testimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    where?: TestimonialWhereInput
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    cursor?: TestimonialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Product.reviews
   */
  export type Product$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Quotation
   */

  export type AggregateQuotation = {
    _count: QuotationCountAggregateOutputType | null
    _avg: QuotationAvgAggregateOutputType | null
    _sum: QuotationSumAggregateOutputType | null
    _min: QuotationMinAggregateOutputType | null
    _max: QuotationMaxAggregateOutputType | null
  }

  export type QuotationAvgAggregateOutputType = {
    quotedPrice: number | null
  }

  export type QuotationSumAggregateOutputType = {
    quotedPrice: number | null
  }

  export type QuotationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    email: string | null
    phone: string | null
    productId: string | null
    message: string | null
    status: $Enums.QuotationStatus | null
    quotedPrice: number | null
    adminNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuotationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    email: string | null
    phone: string | null
    productId: string | null
    message: string | null
    status: $Enums.QuotationStatus | null
    quotedPrice: number | null
    adminNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuotationCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    email: number
    phone: number
    productId: number
    message: number
    status: number
    quotedPrice: number
    adminNotes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuotationAvgAggregateInputType = {
    quotedPrice?: true
  }

  export type QuotationSumAggregateInputType = {
    quotedPrice?: true
  }

  export type QuotationMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    email?: true
    phone?: true
    productId?: true
    message?: true
    status?: true
    quotedPrice?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuotationMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    email?: true
    phone?: true
    productId?: true
    message?: true
    status?: true
    quotedPrice?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuotationCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    email?: true
    phone?: true
    productId?: true
    message?: true
    status?: true
    quotedPrice?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuotationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quotation to aggregate.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quotations
    **/
    _count?: true | QuotationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuotationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuotationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuotationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuotationMaxAggregateInputType
  }

  export type GetQuotationAggregateType<T extends QuotationAggregateArgs> = {
        [P in keyof T & keyof AggregateQuotation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuotation[P]>
      : GetScalarType<T[P], AggregateQuotation[P]>
  }




  export type QuotationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationWhereInput
    orderBy?: QuotationOrderByWithAggregationInput | QuotationOrderByWithAggregationInput[]
    by: QuotationScalarFieldEnum[] | QuotationScalarFieldEnum
    having?: QuotationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuotationCountAggregateInputType | true
    _avg?: QuotationAvgAggregateInputType
    _sum?: QuotationSumAggregateInputType
    _min?: QuotationMinAggregateInputType
    _max?: QuotationMaxAggregateInputType
  }

  export type QuotationGroupByOutputType = {
    id: string
    userId: string | null
    name: string | null
    email: string | null
    phone: string | null
    productId: string | null
    message: string
    status: $Enums.QuotationStatus
    quotedPrice: number | null
    adminNotes: string | null
    createdAt: Date
    updatedAt: Date
    _count: QuotationCountAggregateOutputType | null
    _avg: QuotationAvgAggregateOutputType | null
    _sum: QuotationSumAggregateOutputType | null
    _min: QuotationMinAggregateOutputType | null
    _max: QuotationMaxAggregateOutputType | null
  }

  type GetQuotationGroupByPayload<T extends QuotationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuotationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuotationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuotationGroupByOutputType[P]>
            : GetScalarType<T[P], QuotationGroupByOutputType[P]>
        }
      >
    >


  export type QuotationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    productId?: boolean
    message?: boolean
    status?: boolean
    quotedPrice?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Quotation$userArgs<ExtArgs>
    product?: boolean | Quotation$productArgs<ExtArgs>
  }, ExtArgs["result"]["quotation"]>



  export type QuotationSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    productId?: boolean
    message?: boolean
    status?: boolean
    quotedPrice?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuotationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "email" | "phone" | "productId" | "message" | "status" | "quotedPrice" | "adminNotes" | "createdAt" | "updatedAt", ExtArgs["result"]["quotation"]>
  export type QuotationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Quotation$userArgs<ExtArgs>
    product?: boolean | Quotation$productArgs<ExtArgs>
  }

  export type $QuotationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quotation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      product: Prisma.$ProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      name: string | null
      email: string | null
      phone: string | null
      productId: string | null
      message: string
      status: $Enums.QuotationStatus
      quotedPrice: number | null
      adminNotes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["quotation"]>
    composites: {}
  }

  type QuotationGetPayload<S extends boolean | null | undefined | QuotationDefaultArgs> = $Result.GetResult<Prisma.$QuotationPayload, S>

  type QuotationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuotationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuotationCountAggregateInputType | true
    }

  export interface QuotationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quotation'], meta: { name: 'Quotation' } }
    /**
     * Find zero or one Quotation that matches the filter.
     * @param {QuotationFindUniqueArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuotationFindUniqueArgs>(args: SelectSubset<T, QuotationFindUniqueArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quotation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuotationFindUniqueOrThrowArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuotationFindUniqueOrThrowArgs>(args: SelectSubset<T, QuotationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quotation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFindFirstArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuotationFindFirstArgs>(args?: SelectSubset<T, QuotationFindFirstArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quotation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFindFirstOrThrowArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuotationFindFirstOrThrowArgs>(args?: SelectSubset<T, QuotationFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quotations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quotations
     * const quotations = await prisma.quotation.findMany()
     * 
     * // Get first 10 Quotations
     * const quotations = await prisma.quotation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quotationWithIdOnly = await prisma.quotation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuotationFindManyArgs>(args?: SelectSubset<T, QuotationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quotation.
     * @param {QuotationCreateArgs} args - Arguments to create a Quotation.
     * @example
     * // Create one Quotation
     * const Quotation = await prisma.quotation.create({
     *   data: {
     *     // ... data to create a Quotation
     *   }
     * })
     * 
     */
    create<T extends QuotationCreateArgs>(args: SelectSubset<T, QuotationCreateArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quotations.
     * @param {QuotationCreateManyArgs} args - Arguments to create many Quotations.
     * @example
     * // Create many Quotations
     * const quotation = await prisma.quotation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuotationCreateManyArgs>(args?: SelectSubset<T, QuotationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Quotation.
     * @param {QuotationDeleteArgs} args - Arguments to delete one Quotation.
     * @example
     * // Delete one Quotation
     * const Quotation = await prisma.quotation.delete({
     *   where: {
     *     // ... filter to delete one Quotation
     *   }
     * })
     * 
     */
    delete<T extends QuotationDeleteArgs>(args: SelectSubset<T, QuotationDeleteArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quotation.
     * @param {QuotationUpdateArgs} args - Arguments to update one Quotation.
     * @example
     * // Update one Quotation
     * const quotation = await prisma.quotation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuotationUpdateArgs>(args: SelectSubset<T, QuotationUpdateArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quotations.
     * @param {QuotationDeleteManyArgs} args - Arguments to filter Quotations to delete.
     * @example
     * // Delete a few Quotations
     * const { count } = await prisma.quotation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuotationDeleteManyArgs>(args?: SelectSubset<T, QuotationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quotations
     * const quotation = await prisma.quotation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuotationUpdateManyArgs>(args: SelectSubset<T, QuotationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Quotation.
     * @param {QuotationUpsertArgs} args - Arguments to update or create a Quotation.
     * @example
     * // Update or create a Quotation
     * const quotation = await prisma.quotation.upsert({
     *   create: {
     *     // ... data to create a Quotation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quotation we want to update
     *   }
     * })
     */
    upsert<T extends QuotationUpsertArgs>(args: SelectSubset<T, QuotationUpsertArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quotations that matches the filter.
     * @param {QuotationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const quotation = await prisma.quotation.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: QuotationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Quotation.
     * @param {QuotationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const quotation = await prisma.quotation.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: QuotationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Quotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationCountArgs} args - Arguments to filter Quotations to count.
     * @example
     * // Count the number of Quotations
     * const count = await prisma.quotation.count({
     *   where: {
     *     // ... the filter for the Quotations we want to count
     *   }
     * })
    **/
    count<T extends QuotationCountArgs>(
      args?: Subset<T, QuotationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuotationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuotationAggregateArgs>(args: Subset<T, QuotationAggregateArgs>): Prisma.PrismaPromise<GetQuotationAggregateType<T>>

    /**
     * Group by Quotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuotationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuotationGroupByArgs['orderBy'] }
        : { orderBy?: QuotationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuotationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuotationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quotation model
   */
  readonly fields: QuotationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quotation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuotationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Quotation$userArgs<ExtArgs> = {}>(args?: Subset<T, Quotation$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    product<T extends Quotation$productArgs<ExtArgs> = {}>(args?: Subset<T, Quotation$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quotation model
   */
  interface QuotationFieldRefs {
    readonly id: FieldRef<"Quotation", 'String'>
    readonly userId: FieldRef<"Quotation", 'String'>
    readonly name: FieldRef<"Quotation", 'String'>
    readonly email: FieldRef<"Quotation", 'String'>
    readonly phone: FieldRef<"Quotation", 'String'>
    readonly productId: FieldRef<"Quotation", 'String'>
    readonly message: FieldRef<"Quotation", 'String'>
    readonly status: FieldRef<"Quotation", 'QuotationStatus'>
    readonly quotedPrice: FieldRef<"Quotation", 'Float'>
    readonly adminNotes: FieldRef<"Quotation", 'String'>
    readonly createdAt: FieldRef<"Quotation", 'DateTime'>
    readonly updatedAt: FieldRef<"Quotation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Quotation findUnique
   */
  export type QuotationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation findUniqueOrThrow
   */
  export type QuotationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation findFirst
   */
  export type QuotationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotations.
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotations.
     */
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Quotation findFirstOrThrow
   */
  export type QuotationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotations.
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotations.
     */
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Quotation findMany
   */
  export type QuotationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotations to fetch.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quotations.
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Quotation create
   */
  export type QuotationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * The data needed to create a Quotation.
     */
    data: XOR<QuotationCreateInput, QuotationUncheckedCreateInput>
  }

  /**
   * Quotation createMany
   */
  export type QuotationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quotations.
     */
    data: QuotationCreateManyInput | QuotationCreateManyInput[]
  }

  /**
   * Quotation update
   */
  export type QuotationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * The data needed to update a Quotation.
     */
    data: XOR<QuotationUpdateInput, QuotationUncheckedUpdateInput>
    /**
     * Choose, which Quotation to update.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation updateMany
   */
  export type QuotationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quotations.
     */
    data: XOR<QuotationUpdateManyMutationInput, QuotationUncheckedUpdateManyInput>
    /**
     * Filter which Quotations to update
     */
    where?: QuotationWhereInput
    /**
     * Limit how many Quotations to update.
     */
    limit?: number
  }

  /**
   * Quotation upsert
   */
  export type QuotationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * The filter to search for the Quotation to update in case it exists.
     */
    where: QuotationWhereUniqueInput
    /**
     * In case the Quotation found by the `where` argument doesn't exist, create a new Quotation with this data.
     */
    create: XOR<QuotationCreateInput, QuotationUncheckedCreateInput>
    /**
     * In case the Quotation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuotationUpdateInput, QuotationUncheckedUpdateInput>
  }

  /**
   * Quotation delete
   */
  export type QuotationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter which Quotation to delete.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation deleteMany
   */
  export type QuotationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quotations to delete
     */
    where?: QuotationWhereInput
    /**
     * Limit how many Quotations to delete.
     */
    limit?: number
  }

  /**
   * Quotation findRaw
   */
  export type QuotationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Quotation aggregateRaw
   */
  export type QuotationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Quotation.user
   */
  export type Quotation$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Quotation.product
   */
  export type Quotation$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * Quotation without action
   */
  export type QuotationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
  }


  /**
   * Model OfficialQuotation
   */

  export type AggregateOfficialQuotation = {
    _count: OfficialQuotationCountAggregateOutputType | null
    _avg: OfficialQuotationAvgAggregateOutputType | null
    _sum: OfficialQuotationSumAggregateOutputType | null
    _min: OfficialQuotationMinAggregateOutputType | null
    _max: OfficialQuotationMaxAggregateOutputType | null
  }

  export type OfficialQuotationAvgAggregateOutputType = {
    totalAmount: number | null
  }

  export type OfficialQuotationSumAggregateOutputType = {
    totalAmount: number | null
  }

  export type OfficialQuotationMinAggregateOutputType = {
    id: string | null
    clientName: string | null
    clientEmail: string | null
    totalAmount: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfficialQuotationMaxAggregateOutputType = {
    id: string | null
    clientName: string | null
    clientEmail: string | null
    totalAmount: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfficialQuotationCountAggregateOutputType = {
    id: number
    clientName: number
    clientEmail: number
    totalAmount: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OfficialQuotationAvgAggregateInputType = {
    totalAmount?: true
  }

  export type OfficialQuotationSumAggregateInputType = {
    totalAmount?: true
  }

  export type OfficialQuotationMinAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    totalAmount?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfficialQuotationMaxAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    totalAmount?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfficialQuotationCountAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    totalAmount?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OfficialQuotationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfficialQuotation to aggregate.
     */
    where?: OfficialQuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialQuotations to fetch.
     */
    orderBy?: OfficialQuotationOrderByWithRelationInput | OfficialQuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfficialQuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialQuotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialQuotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OfficialQuotations
    **/
    _count?: true | OfficialQuotationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfficialQuotationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfficialQuotationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfficialQuotationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfficialQuotationMaxAggregateInputType
  }

  export type GetOfficialQuotationAggregateType<T extends OfficialQuotationAggregateArgs> = {
        [P in keyof T & keyof AggregateOfficialQuotation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfficialQuotation[P]>
      : GetScalarType<T[P], AggregateOfficialQuotation[P]>
  }




  export type OfficialQuotationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfficialQuotationWhereInput
    orderBy?: OfficialQuotationOrderByWithAggregationInput | OfficialQuotationOrderByWithAggregationInput[]
    by: OfficialQuotationScalarFieldEnum[] | OfficialQuotationScalarFieldEnum
    having?: OfficialQuotationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfficialQuotationCountAggregateInputType | true
    _avg?: OfficialQuotationAvgAggregateInputType
    _sum?: OfficialQuotationSumAggregateInputType
    _min?: OfficialQuotationMinAggregateInputType
    _max?: OfficialQuotationMaxAggregateInputType
  }

  export type OfficialQuotationGroupByOutputType = {
    id: string
    clientName: string
    clientEmail: string | null
    totalAmount: number
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: OfficialQuotationCountAggregateOutputType | null
    _avg: OfficialQuotationAvgAggregateOutputType | null
    _sum: OfficialQuotationSumAggregateOutputType | null
    _min: OfficialQuotationMinAggregateOutputType | null
    _max: OfficialQuotationMaxAggregateOutputType | null
  }

  type GetOfficialQuotationGroupByPayload<T extends OfficialQuotationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfficialQuotationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfficialQuotationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfficialQuotationGroupByOutputType[P]>
            : GetScalarType<T[P], OfficialQuotationGroupByOutputType[P]>
        }
      >
    >


  export type OfficialQuotationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    items?: boolean | QuotationItemDefaultArgs<ExtArgs>
    totalAmount?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["officialQuotation"]>



  export type OfficialQuotationSelectScalar = {
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    totalAmount?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OfficialQuotationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientName" | "clientEmail" | "items" | "totalAmount" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["officialQuotation"]>
  export type OfficialQuotationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OfficialQuotationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OfficialQuotation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientName: string
      clientEmail: string | null
      totalAmount: number
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["officialQuotation"]>
    composites: {
      items: Prisma.$QuotationItemPayload[]
    }
  }

  type OfficialQuotationGetPayload<S extends boolean | null | undefined | OfficialQuotationDefaultArgs> = $Result.GetResult<Prisma.$OfficialQuotationPayload, S>

  type OfficialQuotationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfficialQuotationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfficialQuotationCountAggregateInputType | true
    }

  export interface OfficialQuotationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OfficialQuotation'], meta: { name: 'OfficialQuotation' } }
    /**
     * Find zero or one OfficialQuotation that matches the filter.
     * @param {OfficialQuotationFindUniqueArgs} args - Arguments to find a OfficialQuotation
     * @example
     * // Get one OfficialQuotation
     * const officialQuotation = await prisma.officialQuotation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfficialQuotationFindUniqueArgs>(args: SelectSubset<T, OfficialQuotationFindUniqueArgs<ExtArgs>>): Prisma__OfficialQuotationClient<$Result.GetResult<Prisma.$OfficialQuotationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OfficialQuotation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfficialQuotationFindUniqueOrThrowArgs} args - Arguments to find a OfficialQuotation
     * @example
     * // Get one OfficialQuotation
     * const officialQuotation = await prisma.officialQuotation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfficialQuotationFindUniqueOrThrowArgs>(args: SelectSubset<T, OfficialQuotationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfficialQuotationClient<$Result.GetResult<Prisma.$OfficialQuotationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OfficialQuotation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialQuotationFindFirstArgs} args - Arguments to find a OfficialQuotation
     * @example
     * // Get one OfficialQuotation
     * const officialQuotation = await prisma.officialQuotation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfficialQuotationFindFirstArgs>(args?: SelectSubset<T, OfficialQuotationFindFirstArgs<ExtArgs>>): Prisma__OfficialQuotationClient<$Result.GetResult<Prisma.$OfficialQuotationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OfficialQuotation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialQuotationFindFirstOrThrowArgs} args - Arguments to find a OfficialQuotation
     * @example
     * // Get one OfficialQuotation
     * const officialQuotation = await prisma.officialQuotation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfficialQuotationFindFirstOrThrowArgs>(args?: SelectSubset<T, OfficialQuotationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfficialQuotationClient<$Result.GetResult<Prisma.$OfficialQuotationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OfficialQuotations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialQuotationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OfficialQuotations
     * const officialQuotations = await prisma.officialQuotation.findMany()
     * 
     * // Get first 10 OfficialQuotations
     * const officialQuotations = await prisma.officialQuotation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const officialQuotationWithIdOnly = await prisma.officialQuotation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfficialQuotationFindManyArgs>(args?: SelectSubset<T, OfficialQuotationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficialQuotationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OfficialQuotation.
     * @param {OfficialQuotationCreateArgs} args - Arguments to create a OfficialQuotation.
     * @example
     * // Create one OfficialQuotation
     * const OfficialQuotation = await prisma.officialQuotation.create({
     *   data: {
     *     // ... data to create a OfficialQuotation
     *   }
     * })
     * 
     */
    create<T extends OfficialQuotationCreateArgs>(args: SelectSubset<T, OfficialQuotationCreateArgs<ExtArgs>>): Prisma__OfficialQuotationClient<$Result.GetResult<Prisma.$OfficialQuotationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OfficialQuotations.
     * @param {OfficialQuotationCreateManyArgs} args - Arguments to create many OfficialQuotations.
     * @example
     * // Create many OfficialQuotations
     * const officialQuotation = await prisma.officialQuotation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfficialQuotationCreateManyArgs>(args?: SelectSubset<T, OfficialQuotationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OfficialQuotation.
     * @param {OfficialQuotationDeleteArgs} args - Arguments to delete one OfficialQuotation.
     * @example
     * // Delete one OfficialQuotation
     * const OfficialQuotation = await prisma.officialQuotation.delete({
     *   where: {
     *     // ... filter to delete one OfficialQuotation
     *   }
     * })
     * 
     */
    delete<T extends OfficialQuotationDeleteArgs>(args: SelectSubset<T, OfficialQuotationDeleteArgs<ExtArgs>>): Prisma__OfficialQuotationClient<$Result.GetResult<Prisma.$OfficialQuotationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OfficialQuotation.
     * @param {OfficialQuotationUpdateArgs} args - Arguments to update one OfficialQuotation.
     * @example
     * // Update one OfficialQuotation
     * const officialQuotation = await prisma.officialQuotation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfficialQuotationUpdateArgs>(args: SelectSubset<T, OfficialQuotationUpdateArgs<ExtArgs>>): Prisma__OfficialQuotationClient<$Result.GetResult<Prisma.$OfficialQuotationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OfficialQuotations.
     * @param {OfficialQuotationDeleteManyArgs} args - Arguments to filter OfficialQuotations to delete.
     * @example
     * // Delete a few OfficialQuotations
     * const { count } = await prisma.officialQuotation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfficialQuotationDeleteManyArgs>(args?: SelectSubset<T, OfficialQuotationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfficialQuotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialQuotationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OfficialQuotations
     * const officialQuotation = await prisma.officialQuotation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfficialQuotationUpdateManyArgs>(args: SelectSubset<T, OfficialQuotationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OfficialQuotation.
     * @param {OfficialQuotationUpsertArgs} args - Arguments to update or create a OfficialQuotation.
     * @example
     * // Update or create a OfficialQuotation
     * const officialQuotation = await prisma.officialQuotation.upsert({
     *   create: {
     *     // ... data to create a OfficialQuotation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OfficialQuotation we want to update
     *   }
     * })
     */
    upsert<T extends OfficialQuotationUpsertArgs>(args: SelectSubset<T, OfficialQuotationUpsertArgs<ExtArgs>>): Prisma__OfficialQuotationClient<$Result.GetResult<Prisma.$OfficialQuotationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OfficialQuotations that matches the filter.
     * @param {OfficialQuotationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const officialQuotation = await prisma.officialQuotation.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: OfficialQuotationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a OfficialQuotation.
     * @param {OfficialQuotationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const officialQuotation = await prisma.officialQuotation.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OfficialQuotationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of OfficialQuotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialQuotationCountArgs} args - Arguments to filter OfficialQuotations to count.
     * @example
     * // Count the number of OfficialQuotations
     * const count = await prisma.officialQuotation.count({
     *   where: {
     *     // ... the filter for the OfficialQuotations we want to count
     *   }
     * })
    **/
    count<T extends OfficialQuotationCountArgs>(
      args?: Subset<T, OfficialQuotationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfficialQuotationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OfficialQuotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialQuotationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfficialQuotationAggregateArgs>(args: Subset<T, OfficialQuotationAggregateArgs>): Prisma.PrismaPromise<GetOfficialQuotationAggregateType<T>>

    /**
     * Group by OfficialQuotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialQuotationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfficialQuotationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfficialQuotationGroupByArgs['orderBy'] }
        : { orderBy?: OfficialQuotationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfficialQuotationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfficialQuotationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OfficialQuotation model
   */
  readonly fields: OfficialQuotationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OfficialQuotation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfficialQuotationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OfficialQuotation model
   */
  interface OfficialQuotationFieldRefs {
    readonly id: FieldRef<"OfficialQuotation", 'String'>
    readonly clientName: FieldRef<"OfficialQuotation", 'String'>
    readonly clientEmail: FieldRef<"OfficialQuotation", 'String'>
    readonly totalAmount: FieldRef<"OfficialQuotation", 'Float'>
    readonly notes: FieldRef<"OfficialQuotation", 'String'>
    readonly createdAt: FieldRef<"OfficialQuotation", 'DateTime'>
    readonly updatedAt: FieldRef<"OfficialQuotation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OfficialQuotation findUnique
   */
  export type OfficialQuotationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
    /**
     * Filter, which OfficialQuotation to fetch.
     */
    where: OfficialQuotationWhereUniqueInput
  }

  /**
   * OfficialQuotation findUniqueOrThrow
   */
  export type OfficialQuotationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
    /**
     * Filter, which OfficialQuotation to fetch.
     */
    where: OfficialQuotationWhereUniqueInput
  }

  /**
   * OfficialQuotation findFirst
   */
  export type OfficialQuotationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
    /**
     * Filter, which OfficialQuotation to fetch.
     */
    where?: OfficialQuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialQuotations to fetch.
     */
    orderBy?: OfficialQuotationOrderByWithRelationInput | OfficialQuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfficialQuotations.
     */
    cursor?: OfficialQuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialQuotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialQuotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfficialQuotations.
     */
    distinct?: OfficialQuotationScalarFieldEnum | OfficialQuotationScalarFieldEnum[]
  }

  /**
   * OfficialQuotation findFirstOrThrow
   */
  export type OfficialQuotationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
    /**
     * Filter, which OfficialQuotation to fetch.
     */
    where?: OfficialQuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialQuotations to fetch.
     */
    orderBy?: OfficialQuotationOrderByWithRelationInput | OfficialQuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfficialQuotations.
     */
    cursor?: OfficialQuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialQuotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialQuotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfficialQuotations.
     */
    distinct?: OfficialQuotationScalarFieldEnum | OfficialQuotationScalarFieldEnum[]
  }

  /**
   * OfficialQuotation findMany
   */
  export type OfficialQuotationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
    /**
     * Filter, which OfficialQuotations to fetch.
     */
    where?: OfficialQuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialQuotations to fetch.
     */
    orderBy?: OfficialQuotationOrderByWithRelationInput | OfficialQuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OfficialQuotations.
     */
    cursor?: OfficialQuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialQuotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialQuotations.
     */
    skip?: number
    distinct?: OfficialQuotationScalarFieldEnum | OfficialQuotationScalarFieldEnum[]
  }

  /**
   * OfficialQuotation create
   */
  export type OfficialQuotationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
    /**
     * The data needed to create a OfficialQuotation.
     */
    data: XOR<OfficialQuotationCreateInput, OfficialQuotationUncheckedCreateInput>
  }

  /**
   * OfficialQuotation createMany
   */
  export type OfficialQuotationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OfficialQuotations.
     */
    data: OfficialQuotationCreateManyInput | OfficialQuotationCreateManyInput[]
  }

  /**
   * OfficialQuotation update
   */
  export type OfficialQuotationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
    /**
     * The data needed to update a OfficialQuotation.
     */
    data: XOR<OfficialQuotationUpdateInput, OfficialQuotationUncheckedUpdateInput>
    /**
     * Choose, which OfficialQuotation to update.
     */
    where: OfficialQuotationWhereUniqueInput
  }

  /**
   * OfficialQuotation updateMany
   */
  export type OfficialQuotationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OfficialQuotations.
     */
    data: XOR<OfficialQuotationUpdateManyMutationInput, OfficialQuotationUncheckedUpdateManyInput>
    /**
     * Filter which OfficialQuotations to update
     */
    where?: OfficialQuotationWhereInput
    /**
     * Limit how many OfficialQuotations to update.
     */
    limit?: number
  }

  /**
   * OfficialQuotation upsert
   */
  export type OfficialQuotationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
    /**
     * The filter to search for the OfficialQuotation to update in case it exists.
     */
    where: OfficialQuotationWhereUniqueInput
    /**
     * In case the OfficialQuotation found by the `where` argument doesn't exist, create a new OfficialQuotation with this data.
     */
    create: XOR<OfficialQuotationCreateInput, OfficialQuotationUncheckedCreateInput>
    /**
     * In case the OfficialQuotation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfficialQuotationUpdateInput, OfficialQuotationUncheckedUpdateInput>
  }

  /**
   * OfficialQuotation delete
   */
  export type OfficialQuotationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
    /**
     * Filter which OfficialQuotation to delete.
     */
    where: OfficialQuotationWhereUniqueInput
  }

  /**
   * OfficialQuotation deleteMany
   */
  export type OfficialQuotationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfficialQuotations to delete
     */
    where?: OfficialQuotationWhereInput
    /**
     * Limit how many OfficialQuotations to delete.
     */
    limit?: number
  }

  /**
   * OfficialQuotation findRaw
   */
  export type OfficialQuotationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OfficialQuotation aggregateRaw
   */
  export type OfficialQuotationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OfficialQuotation without action
   */
  export type OfficialQuotationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialQuotation
     */
    select?: OfficialQuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfficialQuotation
     */
    omit?: OfficialQuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialQuotationInclude<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    designation: string | null
    joiningDate: Date | null
    status: $Enums.EmployeeStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    designation: string | null
    joiningDate: Date | null
    status: $Enums.EmployeeStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    phoneNumber: number
    designation: number
    joiningDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    designation?: true
    joiningDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    designation?: true
    joiningDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    designation?: true
    joiningDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    designation: string
    joiningDate: Date
    status: $Enums.EmployeeStatus
    createdAt: Date
    updatedAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    designation?: boolean
    joiningDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attendance?: boolean | Employee$attendanceArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>



  export type EmployeeSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    designation?: boolean
    joiningDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "phoneNumber" | "designation" | "joiningDate" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | Employee$attendanceArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      attendance: Prisma.$AttendancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      phoneNumber: string
      designation: string
      joiningDate: Date
      status: $Enums.EmployeeStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * @param {EmployeeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const employee = await prisma.employee.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: EmployeeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Employee.
     * @param {EmployeeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const employee = await prisma.employee.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: EmployeeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendance<T extends Employee$attendanceArgs<ExtArgs> = {}>(args?: Subset<T, Employee$attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly firstName: FieldRef<"Employee", 'String'>
    readonly lastName: FieldRef<"Employee", 'String'>
    readonly phoneNumber: FieldRef<"Employee", 'String'>
    readonly designation: FieldRef<"Employee", 'String'>
    readonly joiningDate: FieldRef<"Employee", 'DateTime'>
    readonly status: FieldRef<"Employee", 'EmployeeStatus'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
    readonly updatedAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee findRaw
   */
  export type EmployeeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Employee aggregateRaw
   */
  export type EmployeeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Employee.attendance
   */
  export type Employee$attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceAvgAggregateOutputType = {
    hours: number | null
    wages: number | null
  }

  export type AttendanceSumAggregateOutputType = {
    hours: number | null
    wages: number | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    date: Date | null
    status: $Enums.AttendanceStatus | null
    hours: number | null
    remarks: string | null
    wages: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    date: Date | null
    status: $Enums.AttendanceStatus | null
    hours: number | null
    remarks: string | null
    wages: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    employeeId: number
    date: number
    status: number
    hours: number
    remarks: number
    wages: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AttendanceAvgAggregateInputType = {
    hours?: true
    wages?: true
  }

  export type AttendanceSumAggregateInputType = {
    hours?: true
    wages?: true
  }

  export type AttendanceMinAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    status?: true
    hours?: true
    remarks?: true
    wages?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    status?: true
    hours?: true
    remarks?: true
    wages?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    status?: true
    hours?: true
    remarks?: true
    wages?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _avg?: AttendanceAvgAggregateInputType
    _sum?: AttendanceSumAggregateInputType
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: string
    employeeId: string
    date: Date
    status: $Enums.AttendanceStatus
    hours: number | null
    remarks: string | null
    wages: number | null
    createdAt: Date
    updatedAt: Date
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    status?: boolean
    hours?: boolean
    remarks?: boolean
    wages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>



  export type AttendanceSelectScalar = {
    id?: boolean
    employeeId?: boolean
    date?: boolean
    status?: boolean
    hours?: boolean
    remarks?: boolean
    wages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AttendanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "date" | "status" | "hours" | "remarks" | "wages" | "createdAt" | "updatedAt", ExtArgs["result"]["attendance"]>
  export type AttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      date: Date
      status: $Enums.AttendanceStatus
      hours: number | null
      remarks: string | null
      wages: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * @param {AttendanceFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const attendance = await prisma.attendance.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AttendanceFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Attendance.
     * @param {AttendanceAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const attendance = await prisma.attendance.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AttendanceAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attendance model
   */
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'String'>
    readonly employeeId: FieldRef<"Attendance", 'String'>
    readonly date: FieldRef<"Attendance", 'DateTime'>
    readonly status: FieldRef<"Attendance", 'AttendanceStatus'>
    readonly hours: FieldRef<"Attendance", 'Float'>
    readonly remarks: FieldRef<"Attendance", 'String'>
    readonly wages: FieldRef<"Attendance", 'Float'>
    readonly createdAt: FieldRef<"Attendance", 'DateTime'>
    readonly updatedAt: FieldRef<"Attendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to delete.
     */
    limit?: number
  }

  /**
   * Attendance findRaw
   */
  export type AttendanceFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Attendance aggregateRaw
   */
  export type AttendanceAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
  }


  /**
   * Model Portfolio
   */

  export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  export type PortfolioMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    imageUrl: string | null
    location: string | null
    completionDate: string | null
    clientName: string | null
    productId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    imageUrl: string | null
    location: string | null
    completionDate: string | null
    clientName: string | null
    productId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioCountAggregateOutputType = {
    id: number
    title: number
    description: number
    imageUrl: number
    additionalImages: number
    location: number
    completionDate: number
    clientName: number
    productId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortfolioMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    location?: true
    completionDate?: true
    clientName?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    location?: true
    completionDate?: true
    clientName?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    additionalImages?: true
    location?: true
    completionDate?: true
    clientName?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortfolioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio to aggregate.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portfolios
    **/
    _count?: true | PortfolioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioMaxAggregateInputType
  }

  export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio[P]>
      : GetScalarType<T[P], AggregatePortfolio[P]>
  }




  export type PortfolioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithAggregationInput | PortfolioOrderByWithAggregationInput[]
    by: PortfolioScalarFieldEnum[] | PortfolioScalarFieldEnum
    having?: PortfolioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioCountAggregateInputType | true
    _min?: PortfolioMinAggregateInputType
    _max?: PortfolioMaxAggregateInputType
  }

  export type PortfolioGroupByOutputType = {
    id: string
    title: string
    description: string
    imageUrl: string
    additionalImages: string[]
    location: string | null
    completionDate: string | null
    clientName: string | null
    productId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    additionalImages?: boolean
    location?: boolean
    completionDate?: boolean
    clientName?: boolean
    productId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | Portfolio$productArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>



  export type PortfolioSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    additionalImages?: boolean
    location?: boolean
    completionDate?: boolean
    clientName?: boolean
    productId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortfolioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "imageUrl" | "additionalImages" | "location" | "completionDate" | "clientName" | "productId" | "createdAt" | "updatedAt", ExtArgs["result"]["portfolio"]>
  export type PortfolioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | Portfolio$productArgs<ExtArgs>
  }

  export type $PortfolioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portfolio"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      imageUrl: string
      additionalImages: string[]
      location: string | null
      completionDate: string | null
      clientName: string | null
      productId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portfolio"]>
    composites: {}
  }

  type PortfolioGetPayload<S extends boolean | null | undefined | PortfolioDefaultArgs> = $Result.GetResult<Prisma.$PortfolioPayload, S>

  type PortfolioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortfolioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortfolioCountAggregateInputType | true
    }

  export interface PortfolioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'], meta: { name: 'Portfolio' } }
    /**
     * Find zero or one Portfolio that matches the filter.
     * @param {PortfolioFindUniqueArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioFindUniqueArgs>(args: SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Portfolio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioFindUniqueOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioFindFirstArgs>(args?: SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Portfolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolios
     * const portfolios = await prisma.portfolio.findMany()
     * 
     * // Get first 10 Portfolios
     * const portfolios = await prisma.portfolio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioFindManyArgs>(args?: SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Portfolio.
     * @param {PortfolioCreateArgs} args - Arguments to create a Portfolio.
     * @example
     * // Create one Portfolio
     * const Portfolio = await prisma.portfolio.create({
     *   data: {
     *     // ... data to create a Portfolio
     *   }
     * })
     * 
     */
    create<T extends PortfolioCreateArgs>(args: SelectSubset<T, PortfolioCreateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Portfolios.
     * @param {PortfolioCreateManyArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioCreateManyArgs>(args?: SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Portfolio.
     * @param {PortfolioDeleteArgs} args - Arguments to delete one Portfolio.
     * @example
     * // Delete one Portfolio
     * const Portfolio = await prisma.portfolio.delete({
     *   where: {
     *     // ... filter to delete one Portfolio
     *   }
     * })
     * 
     */
    delete<T extends PortfolioDeleteArgs>(args: SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Portfolio.
     * @param {PortfolioUpdateArgs} args - Arguments to update one Portfolio.
     * @example
     * // Update one Portfolio
     * const portfolio = await prisma.portfolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioUpdateArgs>(args: SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Portfolios.
     * @param {PortfolioDeleteManyArgs} args - Arguments to filter Portfolios to delete.
     * @example
     * // Delete a few Portfolios
     * const { count } = await prisma.portfolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioDeleteManyArgs>(args?: SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioUpdateManyArgs>(args: SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Portfolio.
     * @param {PortfolioUpsertArgs} args - Arguments to update or create a Portfolio.
     * @example
     * // Update or create a Portfolio
     * const portfolio = await prisma.portfolio.upsert({
     *   create: {
     *     // ... data to create a Portfolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioUpsertArgs>(args: SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Portfolios that matches the filter.
     * @param {PortfolioFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const portfolio = await prisma.portfolio.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PortfolioFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Portfolio.
     * @param {PortfolioAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const portfolio = await prisma.portfolio.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PortfolioAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioCountArgs} args - Arguments to filter Portfolios to count.
     * @example
     * // Count the number of Portfolios
     * const count = await prisma.portfolio.count({
     *   where: {
     *     // ... the filter for the Portfolios we want to count
     *   }
     * })
    **/
    count<T extends PortfolioCountArgs>(
      args?: Subset<T, PortfolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioAggregateArgs>(args: Subset<T, PortfolioAggregateArgs>): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>

    /**
     * Group by Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portfolio model
   */
  readonly fields: PortfolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends Portfolio$productArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Portfolio model
   */
  interface PortfolioFieldRefs {
    readonly id: FieldRef<"Portfolio", 'String'>
    readonly title: FieldRef<"Portfolio", 'String'>
    readonly description: FieldRef<"Portfolio", 'String'>
    readonly imageUrl: FieldRef<"Portfolio", 'String'>
    readonly additionalImages: FieldRef<"Portfolio", 'String[]'>
    readonly location: FieldRef<"Portfolio", 'String'>
    readonly completionDate: FieldRef<"Portfolio", 'String'>
    readonly clientName: FieldRef<"Portfolio", 'String'>
    readonly productId: FieldRef<"Portfolio", 'String'>
    readonly createdAt: FieldRef<"Portfolio", 'DateTime'>
    readonly updatedAt: FieldRef<"Portfolio", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Portfolio findUnique
   */
  export type PortfolioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findUniqueOrThrow
   */
  export type PortfolioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findFirst
   */
  export type PortfolioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findFirstOrThrow
   */
  export type PortfolioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findMany
   */
  export type PortfolioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolios to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio create
   */
  export type PortfolioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to create a Portfolio.
     */
    data: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
  }

  /**
   * Portfolio createMany
   */
  export type PortfolioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
  }

  /**
   * Portfolio update
   */
  export type PortfolioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to update a Portfolio.
     */
    data: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
    /**
     * Choose, which Portfolio to update.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio updateMany
   */
  export type PortfolioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number
  }

  /**
   * Portfolio upsert
   */
  export type PortfolioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The filter to search for the Portfolio to update in case it exists.
     */
    where: PortfolioWhereUniqueInput
    /**
     * In case the Portfolio found by the `where` argument doesn't exist, create a new Portfolio with this data.
     */
    create: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
    /**
     * In case the Portfolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
  }

  /**
   * Portfolio delete
   */
  export type PortfolioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter which Portfolio to delete.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio deleteMany
   */
  export type PortfolioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolios to delete
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to delete.
     */
    limit?: number
  }

  /**
   * Portfolio findRaw
   */
  export type PortfolioFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Portfolio aggregateRaw
   */
  export type PortfolioAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Portfolio.product
   */
  export type Portfolio$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * Portfolio without action
   */
  export type PortfolioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
  }


  /**
   * Model Settings
   */

  export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  export type SettingsMinAggregateOutputType = {
    id: string | null
    key: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingsMaxAggregateOutputType = {
    id: string | null
    key: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingsCountAggregateOutputType = {
    id: number
    key: number
    value: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SettingsMinAggregateInputType = {
    id?: true
    key?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingsMaxAggregateInputType = {
    id?: true
    key?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingsCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to aggregate.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingsMaxAggregateInputType
  }

  export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettings[P]>
      : GetScalarType<T[P], AggregateSettings[P]>
  }




  export type SettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingsWhereInput
    orderBy?: SettingsOrderByWithAggregationInput | SettingsOrderByWithAggregationInput[]
    by: SettingsScalarFieldEnum[] | SettingsScalarFieldEnum
    having?: SettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingsCountAggregateInputType | true
    _min?: SettingsMinAggregateInputType
    _max?: SettingsMaxAggregateInputType
  }

  export type SettingsGroupByOutputType = {
    id: string
    key: string
    value: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: SettingsCountAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  type GetSettingsGroupByPayload<T extends SettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SettingsGroupByOutputType[P]>
        }
      >
    >


  export type SettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>



  export type SettingsSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "createdAt" | "updatedAt", ExtArgs["result"]["settings"]>

  export type $SettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Settings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["settings"]>
    composites: {}
  }

  type SettingsGetPayload<S extends boolean | null | undefined | SettingsDefaultArgs> = $Result.GetResult<Prisma.$SettingsPayload, S>

  type SettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettingsCountAggregateInputType | true
    }

  export interface SettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Settings'], meta: { name: 'Settings' } }
    /**
     * Find zero or one Settings that matches the filter.
     * @param {SettingsFindUniqueArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingsFindUniqueArgs>(args: SelectSubset<T, SettingsFindUniqueArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Settings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SettingsFindUniqueOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingsFindFirstArgs>(args?: SelectSubset<T, SettingsFindFirstArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.settings.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingsWithIdOnly = await prisma.settings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingsFindManyArgs>(args?: SelectSubset<T, SettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Settings.
     * @param {SettingsCreateArgs} args - Arguments to create a Settings.
     * @example
     * // Create one Settings
     * const Settings = await prisma.settings.create({
     *   data: {
     *     // ... data to create a Settings
     *   }
     * })
     * 
     */
    create<T extends SettingsCreateArgs>(args: SelectSubset<T, SettingsCreateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settings.
     * @param {SettingsCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingsCreateManyArgs>(args?: SelectSubset<T, SettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Settings.
     * @param {SettingsDeleteArgs} args - Arguments to delete one Settings.
     * @example
     * // Delete one Settings
     * const Settings = await prisma.settings.delete({
     *   where: {
     *     // ... filter to delete one Settings
     *   }
     * })
     * 
     */
    delete<T extends SettingsDeleteArgs>(args: SelectSubset<T, SettingsDeleteArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Settings.
     * @param {SettingsUpdateArgs} args - Arguments to update one Settings.
     * @example
     * // Update one Settings
     * const settings = await prisma.settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingsUpdateArgs>(args: SelectSubset<T, SettingsUpdateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settings.
     * @param {SettingsDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingsDeleteManyArgs>(args?: SelectSubset<T, SettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingsUpdateManyArgs>(args: SelectSubset<T, SettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Settings.
     * @param {SettingsUpsertArgs} args - Arguments to update or create a Settings.
     * @example
     * // Update or create a Settings
     * const settings = await prisma.settings.upsert({
     *   create: {
     *     // ... data to create a Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settings we want to update
     *   }
     * })
     */
    upsert<T extends SettingsUpsertArgs>(args: SelectSubset<T, SettingsUpsertArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * @param {SettingsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const settings = await prisma.settings.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SettingsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Settings.
     * @param {SettingsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const settings = await prisma.settings.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SettingsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.settings.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingsCountArgs>(
      args?: Subset<T, SettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingsAggregateArgs>(args: Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>

    /**
     * Group by Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingsGroupByArgs['orderBy'] }
        : { orderBy?: SettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Settings model
   */
  readonly fields: SettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Settings model
   */
  interface SettingsFieldRefs {
    readonly id: FieldRef<"Settings", 'String'>
    readonly key: FieldRef<"Settings", 'String'>
    readonly value: FieldRef<"Settings", 'Json'>
    readonly createdAt: FieldRef<"Settings", 'DateTime'>
    readonly updatedAt: FieldRef<"Settings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Settings findUnique
   */
  export type SettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findUniqueOrThrow
   */
  export type SettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findFirst
   */
  export type SettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findFirstOrThrow
   */
  export type SettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findMany
   */
  export type SettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings create
   */
  export type SettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a Settings.
     */
    data: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
  }

  /**
   * Settings createMany
   */
  export type SettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
  }

  /**
   * Settings update
   */
  export type SettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a Settings.
     */
    data: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
    /**
     * Choose, which Settings to update.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings updateMany
   */
  export type SettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Settings upsert
   */
  export type SettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the Settings to update in case it exists.
     */
    where: SettingsWhereUniqueInput
    /**
     * In case the Settings found by the `where` argument doesn't exist, create a new Settings with this data.
     */
    create: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
    /**
     * In case the Settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
  }

  /**
   * Settings delete
   */
  export type SettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter which Settings to delete.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings deleteMany
   */
  export type SettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to delete.
     */
    limit?: number
  }

  /**
   * Settings findRaw
   */
  export type SettingsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Settings aggregateRaw
   */
  export type SettingsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Settings without action
   */
  export type SettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
  }


  /**
   * Model Testimonial
   */

  export type AggregateTestimonial = {
    _count: TestimonialCountAggregateOutputType | null
    _avg: TestimonialAvgAggregateOutputType | null
    _sum: TestimonialSumAggregateOutputType | null
    _min: TestimonialMinAggregateOutputType | null
    _max: TestimonialMaxAggregateOutputType | null
  }

  export type TestimonialAvgAggregateOutputType = {
    rating: number | null
  }

  export type TestimonialSumAggregateOutputType = {
    rating: number | null
  }

  export type TestimonialMinAggregateOutputType = {
    id: string | null
    clientName: string | null
    role: string | null
    company: string | null
    content: string | null
    rating: number | null
    imageUrl: string | null
    productId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestimonialMaxAggregateOutputType = {
    id: string | null
    clientName: string | null
    role: string | null
    company: string | null
    content: string | null
    rating: number | null
    imageUrl: string | null
    productId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestimonialCountAggregateOutputType = {
    id: number
    clientName: number
    role: number
    company: number
    content: number
    rating: number
    imageUrl: number
    productId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TestimonialAvgAggregateInputType = {
    rating?: true
  }

  export type TestimonialSumAggregateInputType = {
    rating?: true
  }

  export type TestimonialMinAggregateInputType = {
    id?: true
    clientName?: true
    role?: true
    company?: true
    content?: true
    rating?: true
    imageUrl?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestimonialMaxAggregateInputType = {
    id?: true
    clientName?: true
    role?: true
    company?: true
    content?: true
    rating?: true
    imageUrl?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestimonialCountAggregateInputType = {
    id?: true
    clientName?: true
    role?: true
    company?: true
    content?: true
    rating?: true
    imageUrl?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TestimonialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testimonial to aggregate.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Testimonials
    **/
    _count?: true | TestimonialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestimonialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestimonialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestimonialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestimonialMaxAggregateInputType
  }

  export type GetTestimonialAggregateType<T extends TestimonialAggregateArgs> = {
        [P in keyof T & keyof AggregateTestimonial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestimonial[P]>
      : GetScalarType<T[P], AggregateTestimonial[P]>
  }




  export type TestimonialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestimonialWhereInput
    orderBy?: TestimonialOrderByWithAggregationInput | TestimonialOrderByWithAggregationInput[]
    by: TestimonialScalarFieldEnum[] | TestimonialScalarFieldEnum
    having?: TestimonialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestimonialCountAggregateInputType | true
    _avg?: TestimonialAvgAggregateInputType
    _sum?: TestimonialSumAggregateInputType
    _min?: TestimonialMinAggregateInputType
    _max?: TestimonialMaxAggregateInputType
  }

  export type TestimonialGroupByOutputType = {
    id: string
    clientName: string
    role: string | null
    company: string | null
    content: string
    rating: number
    imageUrl: string | null
    productId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TestimonialCountAggregateOutputType | null
    _avg: TestimonialAvgAggregateOutputType | null
    _sum: TestimonialSumAggregateOutputType | null
    _min: TestimonialMinAggregateOutputType | null
    _max: TestimonialMaxAggregateOutputType | null
  }

  type GetTestimonialGroupByPayload<T extends TestimonialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestimonialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestimonialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestimonialGroupByOutputType[P]>
            : GetScalarType<T[P], TestimonialGroupByOutputType[P]>
        }
      >
    >


  export type TestimonialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientName?: boolean
    role?: boolean
    company?: boolean
    content?: boolean
    rating?: boolean
    imageUrl?: boolean
    productId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | Testimonial$productArgs<ExtArgs>
  }, ExtArgs["result"]["testimonial"]>



  export type TestimonialSelectScalar = {
    id?: boolean
    clientName?: boolean
    role?: boolean
    company?: boolean
    content?: boolean
    rating?: boolean
    imageUrl?: boolean
    productId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TestimonialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientName" | "role" | "company" | "content" | "rating" | "imageUrl" | "productId" | "createdAt" | "updatedAt", ExtArgs["result"]["testimonial"]>
  export type TestimonialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | Testimonial$productArgs<ExtArgs>
  }

  export type $TestimonialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Testimonial"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientName: string
      role: string | null
      company: string | null
      content: string
      rating: number
      imageUrl: string | null
      productId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["testimonial"]>
    composites: {}
  }

  type TestimonialGetPayload<S extends boolean | null | undefined | TestimonialDefaultArgs> = $Result.GetResult<Prisma.$TestimonialPayload, S>

  type TestimonialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestimonialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestimonialCountAggregateInputType | true
    }

  export interface TestimonialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Testimonial'], meta: { name: 'Testimonial' } }
    /**
     * Find zero or one Testimonial that matches the filter.
     * @param {TestimonialFindUniqueArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestimonialFindUniqueArgs>(args: SelectSubset<T, TestimonialFindUniqueArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Testimonial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestimonialFindUniqueOrThrowArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestimonialFindUniqueOrThrowArgs>(args: SelectSubset<T, TestimonialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Testimonial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindFirstArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestimonialFindFirstArgs>(args?: SelectSubset<T, TestimonialFindFirstArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Testimonial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindFirstOrThrowArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestimonialFindFirstOrThrowArgs>(args?: SelectSubset<T, TestimonialFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Testimonials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Testimonials
     * const testimonials = await prisma.testimonial.findMany()
     * 
     * // Get first 10 Testimonials
     * const testimonials = await prisma.testimonial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testimonialWithIdOnly = await prisma.testimonial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestimonialFindManyArgs>(args?: SelectSubset<T, TestimonialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Testimonial.
     * @param {TestimonialCreateArgs} args - Arguments to create a Testimonial.
     * @example
     * // Create one Testimonial
     * const Testimonial = await prisma.testimonial.create({
     *   data: {
     *     // ... data to create a Testimonial
     *   }
     * })
     * 
     */
    create<T extends TestimonialCreateArgs>(args: SelectSubset<T, TestimonialCreateArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Testimonials.
     * @param {TestimonialCreateManyArgs} args - Arguments to create many Testimonials.
     * @example
     * // Create many Testimonials
     * const testimonial = await prisma.testimonial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestimonialCreateManyArgs>(args?: SelectSubset<T, TestimonialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Testimonial.
     * @param {TestimonialDeleteArgs} args - Arguments to delete one Testimonial.
     * @example
     * // Delete one Testimonial
     * const Testimonial = await prisma.testimonial.delete({
     *   where: {
     *     // ... filter to delete one Testimonial
     *   }
     * })
     * 
     */
    delete<T extends TestimonialDeleteArgs>(args: SelectSubset<T, TestimonialDeleteArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Testimonial.
     * @param {TestimonialUpdateArgs} args - Arguments to update one Testimonial.
     * @example
     * // Update one Testimonial
     * const testimonial = await prisma.testimonial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestimonialUpdateArgs>(args: SelectSubset<T, TestimonialUpdateArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Testimonials.
     * @param {TestimonialDeleteManyArgs} args - Arguments to filter Testimonials to delete.
     * @example
     * // Delete a few Testimonials
     * const { count } = await prisma.testimonial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestimonialDeleteManyArgs>(args?: SelectSubset<T, TestimonialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Testimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Testimonials
     * const testimonial = await prisma.testimonial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestimonialUpdateManyArgs>(args: SelectSubset<T, TestimonialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Testimonial.
     * @param {TestimonialUpsertArgs} args - Arguments to update or create a Testimonial.
     * @example
     * // Update or create a Testimonial
     * const testimonial = await prisma.testimonial.upsert({
     *   create: {
     *     // ... data to create a Testimonial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Testimonial we want to update
     *   }
     * })
     */
    upsert<T extends TestimonialUpsertArgs>(args: SelectSubset<T, TestimonialUpsertArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Testimonials that matches the filter.
     * @param {TestimonialFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const testimonial = await prisma.testimonial.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TestimonialFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Testimonial.
     * @param {TestimonialAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const testimonial = await prisma.testimonial.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TestimonialAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Testimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialCountArgs} args - Arguments to filter Testimonials to count.
     * @example
     * // Count the number of Testimonials
     * const count = await prisma.testimonial.count({
     *   where: {
     *     // ... the filter for the Testimonials we want to count
     *   }
     * })
    **/
    count<T extends TestimonialCountArgs>(
      args?: Subset<T, TestimonialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestimonialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Testimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestimonialAggregateArgs>(args: Subset<T, TestimonialAggregateArgs>): Prisma.PrismaPromise<GetTestimonialAggregateType<T>>

    /**
     * Group by Testimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestimonialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestimonialGroupByArgs['orderBy'] }
        : { orderBy?: TestimonialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestimonialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestimonialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Testimonial model
   */
  readonly fields: TestimonialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Testimonial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestimonialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends Testimonial$productArgs<ExtArgs> = {}>(args?: Subset<T, Testimonial$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Testimonial model
   */
  interface TestimonialFieldRefs {
    readonly id: FieldRef<"Testimonial", 'String'>
    readonly clientName: FieldRef<"Testimonial", 'String'>
    readonly role: FieldRef<"Testimonial", 'String'>
    readonly company: FieldRef<"Testimonial", 'String'>
    readonly content: FieldRef<"Testimonial", 'String'>
    readonly rating: FieldRef<"Testimonial", 'Int'>
    readonly imageUrl: FieldRef<"Testimonial", 'String'>
    readonly productId: FieldRef<"Testimonial", 'String'>
    readonly createdAt: FieldRef<"Testimonial", 'DateTime'>
    readonly updatedAt: FieldRef<"Testimonial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Testimonial findUnique
   */
  export type TestimonialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial findUniqueOrThrow
   */
  export type TestimonialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial findFirst
   */
  export type TestimonialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial findFirstOrThrow
   */
  export type TestimonialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial findMany
   */
  export type TestimonialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonials to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial create
   */
  export type TestimonialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * The data needed to create a Testimonial.
     */
    data: XOR<TestimonialCreateInput, TestimonialUncheckedCreateInput>
  }

  /**
   * Testimonial createMany
   */
  export type TestimonialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Testimonials.
     */
    data: TestimonialCreateManyInput | TestimonialCreateManyInput[]
  }

  /**
   * Testimonial update
   */
  export type TestimonialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * The data needed to update a Testimonial.
     */
    data: XOR<TestimonialUpdateInput, TestimonialUncheckedUpdateInput>
    /**
     * Choose, which Testimonial to update.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial updateMany
   */
  export type TestimonialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Testimonials.
     */
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyInput>
    /**
     * Filter which Testimonials to update
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to update.
     */
    limit?: number
  }

  /**
   * Testimonial upsert
   */
  export type TestimonialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * The filter to search for the Testimonial to update in case it exists.
     */
    where: TestimonialWhereUniqueInput
    /**
     * In case the Testimonial found by the `where` argument doesn't exist, create a new Testimonial with this data.
     */
    create: XOR<TestimonialCreateInput, TestimonialUncheckedCreateInput>
    /**
     * In case the Testimonial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestimonialUpdateInput, TestimonialUncheckedUpdateInput>
  }

  /**
   * Testimonial delete
   */
  export type TestimonialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter which Testimonial to delete.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial deleteMany
   */
  export type TestimonialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testimonials to delete
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to delete.
     */
    limit?: number
  }

  /**
   * Testimonial findRaw
   */
  export type TestimonialFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Testimonial aggregateRaw
   */
  export type TestimonialAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Testimonial.product
   */
  export type Testimonial$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * Testimonial without action
   */
  export type TestimonialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    rating: number | null
    comment: string | null
    status: $Enums.ReviewStatus | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    rating: number | null
    comment: string | null
    status: $Enums.ReviewStatus | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    userId: number
    productId: number
    rating: number
    comment: number
    status: number
    approvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    rating?: true
    comment?: true
    status?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    rating?: true
    comment?: true
    status?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    rating?: true
    comment?: true
    status?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    userId: string
    productId: string
    rating: number
    comment: string
    status: $Enums.ReviewStatus
    approvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    rating?: boolean
    comment?: boolean
    status?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>



  export type ReviewSelectScalar = {
    id?: boolean
    userId?: boolean
    productId?: boolean
    rating?: boolean
    comment?: boolean
    status?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "productId" | "rating" | "comment" | "status" | "approvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      productId: string
      rating: number
      comment: string
      status: $Enums.ReviewStatus
      approvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * @param {ReviewFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const review = await prisma.review.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ReviewFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Review.
     * @param {ReviewAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const review = await prisma.review.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ReviewAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly userId: FieldRef<"Review", 'String'>
    readonly productId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly status: FieldRef<"Review", 'ReviewStatus'>
    readonly approvedAt: FieldRef<"Review", 'DateTime'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review findRaw
   */
  export type ReviewFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review aggregateRaw
   */
  export type ReviewAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    image: 'image',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    subCategory: 'subCategory',
    sku: 'sku',
    slug: 'slug',
    status: 'status',
    imageUrl: 'imageUrl',
    additionalImages: 'additionalImages',
    price: 'price',
    mrp: 'mrp',
    discountPercentage: 'discountPercentage',
    stock: 'stock',
    companyName: 'companyName',
    isBestProduct: 'isBestProduct',
    bundleProductIds: 'bundleProductIds',
    relatedProductIds: 'relatedProductIds',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const QuotationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    email: 'email',
    phone: 'phone',
    productId: 'productId',
    message: 'message',
    status: 'status',
    quotedPrice: 'quotedPrice',
    adminNotes: 'adminNotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuotationScalarFieldEnum = (typeof QuotationScalarFieldEnum)[keyof typeof QuotationScalarFieldEnum]


  export const OfficialQuotationScalarFieldEnum: {
    id: 'id',
    clientName: 'clientName',
    clientEmail: 'clientEmail',
    totalAmount: 'totalAmount',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OfficialQuotationScalarFieldEnum = (typeof OfficialQuotationScalarFieldEnum)[keyof typeof OfficialQuotationScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber',
    designation: 'designation',
    joiningDate: 'joiningDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    date: 'date',
    status: 'status',
    hours: 'hours',
    remarks: 'remarks',
    wages: 'wages',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const PortfolioScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    imageUrl: 'imageUrl',
    additionalImages: 'additionalImages',
    location: 'location',
    completionDate: 'completionDate',
    clientName: 'clientName',
    productId: 'productId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortfolioScalarFieldEnum = (typeof PortfolioScalarFieldEnum)[keyof typeof PortfolioScalarFieldEnum]


  export const SettingsScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum]


  export const TestimonialScalarFieldEnum: {
    id: 'id',
    clientName: 'clientName',
    role: 'role',
    company: 'company',
    content: 'content',
    rating: 'rating',
    imageUrl: 'imageUrl',
    productId: 'productId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TestimonialScalarFieldEnum = (typeof TestimonialScalarFieldEnum)[keyof typeof TestimonialScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    rating: 'rating',
    comment: 'comment',
    status: 'status',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Category'
   */
  export type EnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category'>
    


  /**
   * Reference to a field of type 'Category[]'
   */
  export type ListEnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category[]'>
    


  /**
   * Reference to a field of type 'ProductStatus'
   */
  export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus'>
    


  /**
   * Reference to a field of type 'ProductStatus[]'
   */
  export type ListEnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'QuotationStatus'
   */
  export type EnumQuotationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuotationStatus'>
    


  /**
   * Reference to a field of type 'QuotationStatus[]'
   */
  export type ListEnumQuotationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuotationStatus[]'>
    


  /**
   * Reference to a field of type 'EmployeeStatus'
   */
  export type EnumEmployeeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeStatus'>
    


  /**
   * Reference to a field of type 'EmployeeStatus[]'
   */
  export type ListEnumEmployeeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeStatus[]'>
    


  /**
   * Reference to a field of type 'AttendanceStatus'
   */
  export type EnumAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttendanceStatus'>
    


  /**
   * Reference to a field of type 'AttendanceStatus[]'
   */
  export type ListEnumAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttendanceStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'ReviewStatus'
   */
  export type EnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus'>
    


  /**
   * Reference to a field of type 'ReviewStatus[]'
   */
  export type ListEnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    quotations?: QuotationListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    quotations?: QuotationOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    quotations?: QuotationListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    title?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    category?: EnumCategoryFilter<"Product"> | $Enums.Category
    subCategory?: StringNullableFilter<"Product"> | string | null
    sku?: StringNullableFilter<"Product"> | string | null
    slug?: StringNullableFilter<"Product"> | string | null
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    imageUrl?: StringFilter<"Product"> | string
    additionalImages?: StringNullableListFilter<"Product">
    price?: FloatNullableFilter<"Product"> | number | null
    mrp?: FloatNullableFilter<"Product"> | number | null
    discountPercentage?: FloatNullableFilter<"Product"> | number | null
    stock?: IntFilter<"Product"> | number
    companyName?: StringNullableFilter<"Product"> | string | null
    isBestProduct?: BoolFilter<"Product"> | boolean
    customFields?: CustomFieldCompositeListFilter | CustomFieldObjectEqualityInput[]
    bundleProductIds?: StringNullableListFilter<"Product">
    relatedProductIds?: StringNullableListFilter<"Product">
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    quotations?: QuotationListRelationFilter
    portfolios?: PortfolioListRelationFilter
    testimonials?: TestimonialListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    sku?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    additionalImages?: SortOrder
    price?: SortOrder
    mrp?: SortOrder
    discountPercentage?: SortOrder
    stock?: SortOrder
    companyName?: SortOrder
    isBestProduct?: SortOrder
    customFields?: CustomFieldOrderByCompositeAggregateInput
    bundleProductIds?: SortOrder
    relatedProductIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    quotations?: QuotationOrderByRelationAggregateInput
    portfolios?: PortfolioOrderByRelationAggregateInput
    testimonials?: TestimonialOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    title?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    category?: EnumCategoryFilter<"Product"> | $Enums.Category
    subCategory?: StringNullableFilter<"Product"> | string | null
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    imageUrl?: StringFilter<"Product"> | string
    additionalImages?: StringNullableListFilter<"Product">
    price?: FloatNullableFilter<"Product"> | number | null
    mrp?: FloatNullableFilter<"Product"> | number | null
    discountPercentage?: FloatNullableFilter<"Product"> | number | null
    stock?: IntFilter<"Product"> | number
    companyName?: StringNullableFilter<"Product"> | string | null
    isBestProduct?: BoolFilter<"Product"> | boolean
    customFields?: CustomFieldCompositeListFilter | CustomFieldObjectEqualityInput[]
    bundleProductIds?: StringNullableListFilter<"Product">
    relatedProductIds?: StringNullableListFilter<"Product">
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    quotations?: QuotationListRelationFilter
    portfolios?: PortfolioListRelationFilter
    testimonials?: TestimonialListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "sku" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    sku?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    additionalImages?: SortOrder
    price?: SortOrder
    mrp?: SortOrder
    discountPercentage?: SortOrder
    stock?: SortOrder
    companyName?: SortOrder
    isBestProduct?: SortOrder
    bundleProductIds?: SortOrder
    relatedProductIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    title?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    category?: EnumCategoryWithAggregatesFilter<"Product"> | $Enums.Category
    subCategory?: StringNullableWithAggregatesFilter<"Product"> | string | null
    sku?: StringNullableWithAggregatesFilter<"Product"> | string | null
    slug?: StringNullableWithAggregatesFilter<"Product"> | string | null
    status?: EnumProductStatusWithAggregatesFilter<"Product"> | $Enums.ProductStatus
    imageUrl?: StringWithAggregatesFilter<"Product"> | string
    additionalImages?: StringNullableListFilter<"Product">
    price?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    mrp?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    discountPercentage?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    stock?: IntWithAggregatesFilter<"Product"> | number
    companyName?: StringNullableWithAggregatesFilter<"Product"> | string | null
    isBestProduct?: BoolWithAggregatesFilter<"Product"> | boolean
    bundleProductIds?: StringNullableListFilter<"Product">
    relatedProductIds?: StringNullableListFilter<"Product">
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type QuotationWhereInput = {
    AND?: QuotationWhereInput | QuotationWhereInput[]
    OR?: QuotationWhereInput[]
    NOT?: QuotationWhereInput | QuotationWhereInput[]
    id?: StringFilter<"Quotation"> | string
    userId?: StringNullableFilter<"Quotation"> | string | null
    name?: StringNullableFilter<"Quotation"> | string | null
    email?: StringNullableFilter<"Quotation"> | string | null
    phone?: StringNullableFilter<"Quotation"> | string | null
    productId?: StringNullableFilter<"Quotation"> | string | null
    message?: StringFilter<"Quotation"> | string
    status?: EnumQuotationStatusFilter<"Quotation"> | $Enums.QuotationStatus
    quotedPrice?: FloatNullableFilter<"Quotation"> | number | null
    adminNotes?: StringNullableFilter<"Quotation"> | string | null
    createdAt?: DateTimeFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeFilter<"Quotation"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }

  export type QuotationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    productId?: SortOrder
    message?: SortOrder
    status?: SortOrder
    quotedPrice?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type QuotationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuotationWhereInput | QuotationWhereInput[]
    OR?: QuotationWhereInput[]
    NOT?: QuotationWhereInput | QuotationWhereInput[]
    userId?: StringNullableFilter<"Quotation"> | string | null
    name?: StringNullableFilter<"Quotation"> | string | null
    email?: StringNullableFilter<"Quotation"> | string | null
    phone?: StringNullableFilter<"Quotation"> | string | null
    productId?: StringNullableFilter<"Quotation"> | string | null
    message?: StringFilter<"Quotation"> | string
    status?: EnumQuotationStatusFilter<"Quotation"> | $Enums.QuotationStatus
    quotedPrice?: FloatNullableFilter<"Quotation"> | number | null
    adminNotes?: StringNullableFilter<"Quotation"> | string | null
    createdAt?: DateTimeFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeFilter<"Quotation"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }, "id">

  export type QuotationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    productId?: SortOrder
    message?: SortOrder
    status?: SortOrder
    quotedPrice?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuotationCountOrderByAggregateInput
    _avg?: QuotationAvgOrderByAggregateInput
    _max?: QuotationMaxOrderByAggregateInput
    _min?: QuotationMinOrderByAggregateInput
    _sum?: QuotationSumOrderByAggregateInput
  }

  export type QuotationScalarWhereWithAggregatesInput = {
    AND?: QuotationScalarWhereWithAggregatesInput | QuotationScalarWhereWithAggregatesInput[]
    OR?: QuotationScalarWhereWithAggregatesInput[]
    NOT?: QuotationScalarWhereWithAggregatesInput | QuotationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Quotation"> | string
    userId?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    name?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    email?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    productId?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    message?: StringWithAggregatesFilter<"Quotation"> | string
    status?: EnumQuotationStatusWithAggregatesFilter<"Quotation"> | $Enums.QuotationStatus
    quotedPrice?: FloatNullableWithAggregatesFilter<"Quotation"> | number | null
    adminNotes?: StringNullableWithAggregatesFilter<"Quotation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Quotation"> | Date | string
  }

  export type OfficialQuotationWhereInput = {
    AND?: OfficialQuotationWhereInput | OfficialQuotationWhereInput[]
    OR?: OfficialQuotationWhereInput[]
    NOT?: OfficialQuotationWhereInput | OfficialQuotationWhereInput[]
    id?: StringFilter<"OfficialQuotation"> | string
    clientName?: StringFilter<"OfficialQuotation"> | string
    clientEmail?: StringNullableFilter<"OfficialQuotation"> | string | null
    items?: QuotationItemCompositeListFilter | QuotationItemObjectEqualityInput[]
    totalAmount?: FloatFilter<"OfficialQuotation"> | number
    notes?: StringNullableFilter<"OfficialQuotation"> | string | null
    createdAt?: DateTimeFilter<"OfficialQuotation"> | Date | string
    updatedAt?: DateTimeFilter<"OfficialQuotation"> | Date | string
  }

  export type OfficialQuotationOrderByWithRelationInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    items?: QuotationItemOrderByCompositeAggregateInput
    totalAmount?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfficialQuotationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OfficialQuotationWhereInput | OfficialQuotationWhereInput[]
    OR?: OfficialQuotationWhereInput[]
    NOT?: OfficialQuotationWhereInput | OfficialQuotationWhereInput[]
    clientName?: StringFilter<"OfficialQuotation"> | string
    clientEmail?: StringNullableFilter<"OfficialQuotation"> | string | null
    items?: QuotationItemCompositeListFilter | QuotationItemObjectEqualityInput[]
    totalAmount?: FloatFilter<"OfficialQuotation"> | number
    notes?: StringNullableFilter<"OfficialQuotation"> | string | null
    createdAt?: DateTimeFilter<"OfficialQuotation"> | Date | string
    updatedAt?: DateTimeFilter<"OfficialQuotation"> | Date | string
  }, "id">

  export type OfficialQuotationOrderByWithAggregationInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    totalAmount?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OfficialQuotationCountOrderByAggregateInput
    _avg?: OfficialQuotationAvgOrderByAggregateInput
    _max?: OfficialQuotationMaxOrderByAggregateInput
    _min?: OfficialQuotationMinOrderByAggregateInput
    _sum?: OfficialQuotationSumOrderByAggregateInput
  }

  export type OfficialQuotationScalarWhereWithAggregatesInput = {
    AND?: OfficialQuotationScalarWhereWithAggregatesInput | OfficialQuotationScalarWhereWithAggregatesInput[]
    OR?: OfficialQuotationScalarWhereWithAggregatesInput[]
    NOT?: OfficialQuotationScalarWhereWithAggregatesInput | OfficialQuotationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OfficialQuotation"> | string
    clientName?: StringWithAggregatesFilter<"OfficialQuotation"> | string
    clientEmail?: StringNullableWithAggregatesFilter<"OfficialQuotation"> | string | null
    totalAmount?: FloatWithAggregatesFilter<"OfficialQuotation"> | number
    notes?: StringNullableWithAggregatesFilter<"OfficialQuotation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OfficialQuotation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OfficialQuotation"> | Date | string
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    firstName?: StringFilter<"Employee"> | string
    lastName?: StringFilter<"Employee"> | string
    phoneNumber?: StringFilter<"Employee"> | string
    designation?: StringFilter<"Employee"> | string
    joiningDate?: DateTimeFilter<"Employee"> | Date | string
    status?: EnumEmployeeStatusFilter<"Employee"> | $Enums.EmployeeStatus
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    attendance?: AttendanceListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    designation?: SortOrder
    joiningDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attendance?: AttendanceOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    firstName?: StringFilter<"Employee"> | string
    lastName?: StringFilter<"Employee"> | string
    phoneNumber?: StringFilter<"Employee"> | string
    designation?: StringFilter<"Employee"> | string
    joiningDate?: DateTimeFilter<"Employee"> | Date | string
    status?: EnumEmployeeStatusFilter<"Employee"> | $Enums.EmployeeStatus
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    attendance?: AttendanceListRelationFilter
  }, "id">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    designation?: SortOrder
    joiningDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    firstName?: StringWithAggregatesFilter<"Employee"> | string
    lastName?: StringWithAggregatesFilter<"Employee"> | string
    phoneNumber?: StringWithAggregatesFilter<"Employee"> | string
    designation?: StringWithAggregatesFilter<"Employee"> | string
    joiningDate?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    status?: EnumEmployeeStatusWithAggregatesFilter<"Employee"> | $Enums.EmployeeStatus
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: StringFilter<"Attendance"> | string
    employeeId?: StringFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    status?: EnumAttendanceStatusFilter<"Attendance"> | $Enums.AttendanceStatus
    hours?: FloatNullableFilter<"Attendance"> | number | null
    remarks?: StringNullableFilter<"Attendance"> | string | null
    wages?: FloatNullableFilter<"Attendance"> | number | null
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    hours?: SortOrder
    remarks?: SortOrder
    wages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId_date?: AttendanceEmployeeIdDateCompoundUniqueInput
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    employeeId?: StringFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    status?: EnumAttendanceStatusFilter<"Attendance"> | $Enums.AttendanceStatus
    hours?: FloatNullableFilter<"Attendance"> | number | null
    remarks?: StringNullableFilter<"Attendance"> | string | null
    wages?: FloatNullableFilter<"Attendance"> | number | null
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id" | "employeeId_date">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    hours?: SortOrder
    remarks?: SortOrder
    wages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _avg?: AttendanceAvgOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
    _sum?: AttendanceSumOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attendance"> | string
    employeeId?: StringWithAggregatesFilter<"Attendance"> | string
    date?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    status?: EnumAttendanceStatusWithAggregatesFilter<"Attendance"> | $Enums.AttendanceStatus
    hours?: FloatNullableWithAggregatesFilter<"Attendance"> | number | null
    remarks?: StringNullableWithAggregatesFilter<"Attendance"> | string | null
    wages?: FloatNullableWithAggregatesFilter<"Attendance"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
  }

  export type PortfolioWhereInput = {
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    title?: StringFilter<"Portfolio"> | string
    description?: StringFilter<"Portfolio"> | string
    imageUrl?: StringFilter<"Portfolio"> | string
    additionalImages?: StringNullableListFilter<"Portfolio">
    location?: StringNullableFilter<"Portfolio"> | string | null
    completionDate?: StringNullableFilter<"Portfolio"> | string | null
    clientName?: StringNullableFilter<"Portfolio"> | string | null
    productId?: StringNullableFilter<"Portfolio"> | string | null
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }

  export type PortfolioOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    additionalImages?: SortOrder
    location?: SortOrder
    completionDate?: SortOrder
    clientName?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type PortfolioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    title?: StringFilter<"Portfolio"> | string
    description?: StringFilter<"Portfolio"> | string
    imageUrl?: StringFilter<"Portfolio"> | string
    additionalImages?: StringNullableListFilter<"Portfolio">
    location?: StringNullableFilter<"Portfolio"> | string | null
    completionDate?: StringNullableFilter<"Portfolio"> | string | null
    clientName?: StringNullableFilter<"Portfolio"> | string | null
    productId?: StringNullableFilter<"Portfolio"> | string | null
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }, "id">

  export type PortfolioOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    additionalImages?: SortOrder
    location?: SortOrder
    completionDate?: SortOrder
    clientName?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortfolioCountOrderByAggregateInput
    _max?: PortfolioMaxOrderByAggregateInput
    _min?: PortfolioMinOrderByAggregateInput
  }

  export type PortfolioScalarWhereWithAggregatesInput = {
    AND?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    OR?: PortfolioScalarWhereWithAggregatesInput[]
    NOT?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Portfolio"> | string
    title?: StringWithAggregatesFilter<"Portfolio"> | string
    description?: StringWithAggregatesFilter<"Portfolio"> | string
    imageUrl?: StringWithAggregatesFilter<"Portfolio"> | string
    additionalImages?: StringNullableListFilter<"Portfolio">
    location?: StringNullableWithAggregatesFilter<"Portfolio"> | string | null
    completionDate?: StringNullableWithAggregatesFilter<"Portfolio"> | string | null
    clientName?: StringNullableWithAggregatesFilter<"Portfolio"> | string | null
    productId?: StringNullableWithAggregatesFilter<"Portfolio"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
  }

  export type SettingsWhereInput = {
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    id?: StringFilter<"Settings"> | string
    key?: StringFilter<"Settings"> | string
    value?: JsonFilter<"Settings">
    createdAt?: DateTimeFilter<"Settings"> | Date | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }

  export type SettingsOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    value?: JsonFilter<"Settings">
    createdAt?: DateTimeFilter<"Settings"> | Date | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }, "id" | "key">

  export type SettingsOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingsCountOrderByAggregateInput
    _max?: SettingsMaxOrderByAggregateInput
    _min?: SettingsMinOrderByAggregateInput
  }

  export type SettingsScalarWhereWithAggregatesInput = {
    AND?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    OR?: SettingsScalarWhereWithAggregatesInput[]
    NOT?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Settings"> | string
    key?: StringWithAggregatesFilter<"Settings"> | string
    value?: JsonWithAggregatesFilter<"Settings">
    createdAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
  }

  export type TestimonialWhereInput = {
    AND?: TestimonialWhereInput | TestimonialWhereInput[]
    OR?: TestimonialWhereInput[]
    NOT?: TestimonialWhereInput | TestimonialWhereInput[]
    id?: StringFilter<"Testimonial"> | string
    clientName?: StringFilter<"Testimonial"> | string
    role?: StringNullableFilter<"Testimonial"> | string | null
    company?: StringNullableFilter<"Testimonial"> | string | null
    content?: StringFilter<"Testimonial"> | string
    rating?: IntFilter<"Testimonial"> | number
    imageUrl?: StringNullableFilter<"Testimonial"> | string | null
    productId?: StringNullableFilter<"Testimonial"> | string | null
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
    updatedAt?: DateTimeFilter<"Testimonial"> | Date | string
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }

  export type TestimonialOrderByWithRelationInput = {
    id?: SortOrder
    clientName?: SortOrder
    role?: SortOrder
    company?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    imageUrl?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type TestimonialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestimonialWhereInput | TestimonialWhereInput[]
    OR?: TestimonialWhereInput[]
    NOT?: TestimonialWhereInput | TestimonialWhereInput[]
    clientName?: StringFilter<"Testimonial"> | string
    role?: StringNullableFilter<"Testimonial"> | string | null
    company?: StringNullableFilter<"Testimonial"> | string | null
    content?: StringFilter<"Testimonial"> | string
    rating?: IntFilter<"Testimonial"> | number
    imageUrl?: StringNullableFilter<"Testimonial"> | string | null
    productId?: StringNullableFilter<"Testimonial"> | string | null
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
    updatedAt?: DateTimeFilter<"Testimonial"> | Date | string
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }, "id">

  export type TestimonialOrderByWithAggregationInput = {
    id?: SortOrder
    clientName?: SortOrder
    role?: SortOrder
    company?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    imageUrl?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TestimonialCountOrderByAggregateInput
    _avg?: TestimonialAvgOrderByAggregateInput
    _max?: TestimonialMaxOrderByAggregateInput
    _min?: TestimonialMinOrderByAggregateInput
    _sum?: TestimonialSumOrderByAggregateInput
  }

  export type TestimonialScalarWhereWithAggregatesInput = {
    AND?: TestimonialScalarWhereWithAggregatesInput | TestimonialScalarWhereWithAggregatesInput[]
    OR?: TestimonialScalarWhereWithAggregatesInput[]
    NOT?: TestimonialScalarWhereWithAggregatesInput | TestimonialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Testimonial"> | string
    clientName?: StringWithAggregatesFilter<"Testimonial"> | string
    role?: StringNullableWithAggregatesFilter<"Testimonial"> | string | null
    company?: StringNullableWithAggregatesFilter<"Testimonial"> | string | null
    content?: StringWithAggregatesFilter<"Testimonial"> | string
    rating?: IntWithAggregatesFilter<"Testimonial"> | number
    imageUrl?: StringNullableWithAggregatesFilter<"Testimonial"> | string | null
    productId?: StringNullableWithAggregatesFilter<"Testimonial"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Testimonial"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Testimonial"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    productId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    status?: EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus
    approvedAt?: DateTimeNullableFilter<"Review"> | Date | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_productId?: ReviewUserIdProductIdCompoundUniqueInput
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    userId?: StringFilter<"Review"> | string
    productId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    status?: EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus
    approvedAt?: DateTimeNullableFilter<"Review"> | Date | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "userId_productId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    userId?: StringWithAggregatesFilter<"Review"> | string
    productId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringWithAggregatesFilter<"Review"> | string
    status?: EnumReviewStatusWithAggregatesFilter<"Review"> | $Enums.ReviewStatus
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Review"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationCreateNestedManyWithoutProductInput
    portfolios?: PortfolioCreateNestedManyWithoutProductInput
    testimonials?: TestimonialCreateNestedManyWithoutProductInput
    reviews?: ReviewCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationUncheckedCreateNestedManyWithoutProductInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutProductInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProductInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUpdateManyWithoutProductNestedInput
    portfolios?: PortfolioUpdateManyWithoutProductNestedInput
    testimonials?: TestimonialUpdateManyWithoutProductNestedInput
    reviews?: ReviewUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUncheckedUpdateManyWithoutProductNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutProductNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProductNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    message: string
    status?: $Enums.QuotationStatus
    quotedPrice?: number | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutQuotationsInput
    product?: ProductCreateNestedOneWithoutQuotationsInput
  }

  export type QuotationUncheckedCreateInput = {
    id?: string
    userId?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    productId?: string | null
    message: string
    status?: $Enums.QuotationStatus
    quotedPrice?: number | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutQuotationsNestedInput
    product?: ProductUpdateOneWithoutQuotationsNestedInput
  }

  export type QuotationUncheckedUpdateInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationCreateManyInput = {
    id?: string
    userId?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    productId?: string | null
    message: string
    status?: $Enums.QuotationStatus
    quotedPrice?: number | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationUncheckedUpdateManyInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialQuotationCreateInput = {
    id?: string
    clientName: string
    clientEmail?: string | null
    items?: XOR<QuotationItemListCreateEnvelopeInput, QuotationItemCreateInput> | QuotationItemCreateInput[]
    totalAmount: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfficialQuotationUncheckedCreateInput = {
    id?: string
    clientName: string
    clientEmail?: string | null
    items?: XOR<QuotationItemListCreateEnvelopeInput, QuotationItemCreateInput> | QuotationItemCreateInput[]
    totalAmount: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfficialQuotationUpdateInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    items?: XOR<QuotationItemListUpdateEnvelopeInput, QuotationItemCreateInput> | QuotationItemCreateInput[]
    totalAmount?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialQuotationUncheckedUpdateInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    items?: XOR<QuotationItemListUpdateEnvelopeInput, QuotationItemCreateInput> | QuotationItemCreateInput[]
    totalAmount?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialQuotationCreateManyInput = {
    id?: string
    clientName: string
    clientEmail?: string | null
    items?: XOR<QuotationItemListCreateEnvelopeInput, QuotationItemCreateInput> | QuotationItemCreateInput[]
    totalAmount: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfficialQuotationUpdateManyMutationInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    items?: XOR<QuotationItemListUpdateEnvelopeInput, QuotationItemCreateInput> | QuotationItemCreateInput[]
    totalAmount?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialQuotationUncheckedUpdateManyInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    items?: XOR<QuotationItemListUpdateEnvelopeInput, QuotationItemCreateInput> | QuotationItemCreateInput[]
    totalAmount?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateInput = {
    id?: string
    firstName: string
    lastName: string
    phoneNumber: string
    designation: string
    joiningDate?: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendanceCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    phoneNumber: string
    designation: string
    joiningDate?: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendanceUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    joiningDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    joiningDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    phoneNumber: string
    designation: string
    joiningDate?: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    joiningDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    joiningDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateInput = {
    id?: string
    date: Date | string
    status: $Enums.AttendanceStatus
    hours?: number | null
    remarks?: string | null
    wages?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutAttendanceInput
  }

  export type AttendanceUncheckedCreateInput = {
    id?: string
    employeeId: string
    date: Date | string
    status: $Enums.AttendanceStatus
    hours?: number | null
    remarks?: string | null
    wages?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    hours?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    wages?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAttendanceNestedInput
  }

  export type AttendanceUncheckedUpdateInput = {
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    hours?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    wages?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateManyInput = {
    id?: string
    employeeId: string
    date: Date | string
    status: $Enums.AttendanceStatus
    hours?: number | null
    remarks?: string | null
    wages?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    hours?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    wages?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyInput = {
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    hours?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    wages?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateInput = {
    id?: string
    title: string
    description: string
    imageUrl: string
    additionalImages?: PortfolioCreateadditionalImagesInput | string[]
    location?: string | null
    completionDate?: string | null
    clientName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product?: ProductCreateNestedOneWithoutPortfoliosInput
  }

  export type PortfolioUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    imageUrl: string
    additionalImages?: PortfolioCreateadditionalImagesInput | string[]
    location?: string | null
    completionDate?: string | null
    clientName?: string | null
    productId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: PortfolioUpdateadditionalImagesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneWithoutPortfoliosNestedInput
  }

  export type PortfolioUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: PortfolioUpdateadditionalImagesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateManyInput = {
    id?: string
    title: string
    description: string
    imageUrl: string
    additionalImages?: PortfolioCreateadditionalImagesInput | string[]
    location?: string | null
    completionDate?: string | null
    clientName?: string | null
    productId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: PortfolioUpdateadditionalImagesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: PortfolioUpdateadditionalImagesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateInput = {
    id?: string
    key: string
    value: InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUncheckedCreateInput = {
    id?: string
    key: string
    value: InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateManyInput = {
    id?: string
    key: string
    value: InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialCreateInput = {
    id?: string
    clientName: string
    role?: string | null
    company?: string | null
    content: string
    rating?: number
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product?: ProductCreateNestedOneWithoutTestimonialsInput
  }

  export type TestimonialUncheckedCreateInput = {
    id?: string
    clientName: string
    role?: string | null
    company?: string | null
    content: string
    rating?: number
    imageUrl?: string | null
    productId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestimonialUpdateInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneWithoutTestimonialsNestedInput
  }

  export type TestimonialUncheckedUpdateInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialCreateManyInput = {
    id?: string
    clientName: string
    role?: string | null
    company?: string | null
    content: string
    rating?: number
    imageUrl?: string | null
    productId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestimonialUpdateManyMutationInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateManyInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating?: number
    comment: string
    status?: $Enums.ReviewStatus
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
    product: ProductCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    userId: string
    productId: string
    rating?: number
    comment: string
    status?: $Enums.ReviewStatus
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
    product?: ProductUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    userId: string
    productId: string
    rating?: number
    comment: string
    status?: $Enums.ReviewStatus
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type QuotationListRelationFilter = {
    every?: QuotationWhereInput
    some?: QuotationWhereInput
    none?: QuotationWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type QuotationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
  }

  export type EnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CustomFieldCompositeListFilter = {
    equals?: CustomFieldObjectEqualityInput[]
    every?: CustomFieldWhereInput
    some?: CustomFieldWhereInput
    none?: CustomFieldWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type CustomFieldObjectEqualityInput = {
    label: string
    value: string
  }

  export type PortfolioListRelationFilter = {
    every?: PortfolioWhereInput
    some?: PortfolioWhereInput
    none?: PortfolioWhereInput
  }

  export type TestimonialListRelationFilter = {
    every?: TestimonialWhereInput
    some?: TestimonialWhereInput
    none?: TestimonialWhereInput
  }

  export type CustomFieldOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type PortfolioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestimonialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    sku?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    additionalImages?: SortOrder
    price?: SortOrder
    mrp?: SortOrder
    discountPercentage?: SortOrder
    stock?: SortOrder
    companyName?: SortOrder
    isBestProduct?: SortOrder
    bundleProductIds?: SortOrder
    relatedProductIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
    mrp?: SortOrder
    discountPercentage?: SortOrder
    stock?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    sku?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    mrp?: SortOrder
    discountPercentage?: SortOrder
    stock?: SortOrder
    companyName?: SortOrder
    isBestProduct?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    sku?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    mrp?: SortOrder
    discountPercentage?: SortOrder
    stock?: SortOrder
    companyName?: SortOrder
    isBestProduct?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
    mrp?: SortOrder
    discountPercentage?: SortOrder
    stock?: SortOrder
  }

  export type EnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
  }

  export type EnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumQuotationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotationStatus | EnumQuotationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuotationStatusFilter<$PrismaModel> | $Enums.QuotationStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ProductNullableScalarRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type QuotationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    productId?: SortOrder
    message?: SortOrder
    status?: SortOrder
    quotedPrice?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuotationAvgOrderByAggregateInput = {
    quotedPrice?: SortOrder
  }

  export type QuotationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    productId?: SortOrder
    message?: SortOrder
    status?: SortOrder
    quotedPrice?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuotationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    productId?: SortOrder
    message?: SortOrder
    status?: SortOrder
    quotedPrice?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuotationSumOrderByAggregateInput = {
    quotedPrice?: SortOrder
  }

  export type EnumQuotationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotationStatus | EnumQuotationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuotationStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuotationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuotationStatusFilter<$PrismaModel>
    _max?: NestedEnumQuotationStatusFilter<$PrismaModel>
  }

  export type QuotationItemCompositeListFilter = {
    equals?: QuotationItemObjectEqualityInput[]
    every?: QuotationItemWhereInput
    some?: QuotationItemWhereInput
    none?: QuotationItemWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type QuotationItemObjectEqualityInput = {
    description: string
    rate: number
    quantity: number
    amount: number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type QuotationItemOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type OfficialQuotationCountOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    totalAmount?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfficialQuotationAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
  }

  export type OfficialQuotationMaxOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    totalAmount?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfficialQuotationMinOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    totalAmount?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfficialQuotationSumOrderByAggregateInput = {
    totalAmount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumEmployeeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusFilter<$PrismaModel> | $Enums.EmployeeStatus
  }

  export type AttendanceListRelationFilter = {
    every?: AttendanceWhereInput
    some?: AttendanceWhereInput
    none?: AttendanceWhereInput
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    designation?: SortOrder
    joiningDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    designation?: SortOrder
    joiningDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    designation?: SortOrder
    joiningDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEmployeeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeStatusFilter<$PrismaModel>
    _max?: NestedEnumEmployeeStatusFilter<$PrismaModel>
  }

  export type EnumAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusFilter<$PrismaModel> | $Enums.AttendanceStatus
  }

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type AttendanceEmployeeIdDateCompoundUniqueInput = {
    employeeId: string
    date: Date | string
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    hours?: SortOrder
    remarks?: SortOrder
    wages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceAvgOrderByAggregateInput = {
    hours?: SortOrder
    wages?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    hours?: SortOrder
    remarks?: SortOrder
    wages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    hours?: SortOrder
    remarks?: SortOrder
    wages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceSumOrderByAggregateInput = {
    hours?: SortOrder
    wages?: SortOrder
  }

  export type EnumAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttendanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttendanceStatusFilter<$PrismaModel>
    _max?: NestedEnumAttendanceStatusFilter<$PrismaModel>
  }

  export type PortfolioCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    additionalImages?: SortOrder
    location?: SortOrder
    completionDate?: SortOrder
    clientName?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    location?: SortOrder
    completionDate?: SortOrder
    clientName?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    location?: SortOrder
    completionDate?: SortOrder
    clientName?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type SettingsCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type TestimonialCountOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    role?: SortOrder
    company?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    imageUrl?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestimonialAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type TestimonialMaxOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    role?: SortOrder
    company?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    imageUrl?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestimonialMinOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    role?: SortOrder
    company?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    imageUrl?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestimonialSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type EnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ReviewUserIdProductIdCompoundUniqueInput = {
    userId: string
    productId: string
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type EnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewStatusFilter<$PrismaModel>
    _max?: NestedEnumReviewStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type QuotationCreateNestedManyWithoutUserInput = {
    create?: XOR<QuotationCreateWithoutUserInput, QuotationUncheckedCreateWithoutUserInput> | QuotationCreateWithoutUserInput[] | QuotationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutUserInput | QuotationCreateOrConnectWithoutUserInput[]
    createMany?: QuotationCreateManyUserInputEnvelope
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type QuotationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QuotationCreateWithoutUserInput, QuotationUncheckedCreateWithoutUserInput> | QuotationCreateWithoutUserInput[] | QuotationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutUserInput | QuotationCreateOrConnectWithoutUserInput[]
    createMany?: QuotationCreateManyUserInputEnvelope
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type QuotationUpdateManyWithoutUserNestedInput = {
    create?: XOR<QuotationCreateWithoutUserInput, QuotationUncheckedCreateWithoutUserInput> | QuotationCreateWithoutUserInput[] | QuotationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutUserInput | QuotationCreateOrConnectWithoutUserInput[]
    upsert?: QuotationUpsertWithWhereUniqueWithoutUserInput | QuotationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QuotationCreateManyUserInputEnvelope
    set?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    disconnect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    delete?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    update?: QuotationUpdateWithWhereUniqueWithoutUserInput | QuotationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QuotationUpdateManyWithWhereWithoutUserInput | QuotationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type QuotationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QuotationCreateWithoutUserInput, QuotationUncheckedCreateWithoutUserInput> | QuotationCreateWithoutUserInput[] | QuotationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutUserInput | QuotationCreateOrConnectWithoutUserInput[]
    upsert?: QuotationUpsertWithWhereUniqueWithoutUserInput | QuotationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QuotationCreateManyUserInputEnvelope
    set?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    disconnect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    delete?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    update?: QuotationUpdateWithWhereUniqueWithoutUserInput | QuotationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QuotationUpdateManyWithWhereWithoutUserInput | QuotationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ProductCreateadditionalImagesInput = {
    set: string[]
  }

  export type CustomFieldListCreateEnvelopeInput = {
    set?: CustomFieldCreateInput | CustomFieldCreateInput[]
  }

  export type CustomFieldCreateInput = {
    label: string
    value: string
  }

  export type ProductCreatebundleProductIdsInput = {
    set: string[]
  }

  export type ProductCreaterelatedProductIdsInput = {
    set: string[]
  }

  export type QuotationCreateNestedManyWithoutProductInput = {
    create?: XOR<QuotationCreateWithoutProductInput, QuotationUncheckedCreateWithoutProductInput> | QuotationCreateWithoutProductInput[] | QuotationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutProductInput | QuotationCreateOrConnectWithoutProductInput[]
    createMany?: QuotationCreateManyProductInputEnvelope
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
  }

  export type PortfolioCreateNestedManyWithoutProductInput = {
    create?: XOR<PortfolioCreateWithoutProductInput, PortfolioUncheckedCreateWithoutProductInput> | PortfolioCreateWithoutProductInput[] | PortfolioUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutProductInput | PortfolioCreateOrConnectWithoutProductInput[]
    createMany?: PortfolioCreateManyProductInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type TestimonialCreateNestedManyWithoutProductInput = {
    create?: XOR<TestimonialCreateWithoutProductInput, TestimonialUncheckedCreateWithoutProductInput> | TestimonialCreateWithoutProductInput[] | TestimonialUncheckedCreateWithoutProductInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutProductInput | TestimonialCreateOrConnectWithoutProductInput[]
    createMany?: TestimonialCreateManyProductInputEnvelope
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutProductInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type QuotationUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<QuotationCreateWithoutProductInput, QuotationUncheckedCreateWithoutProductInput> | QuotationCreateWithoutProductInput[] | QuotationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutProductInput | QuotationCreateOrConnectWithoutProductInput[]
    createMany?: QuotationCreateManyProductInputEnvelope
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
  }

  export type PortfolioUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<PortfolioCreateWithoutProductInput, PortfolioUncheckedCreateWithoutProductInput> | PortfolioCreateWithoutProductInput[] | PortfolioUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutProductInput | PortfolioCreateOrConnectWithoutProductInput[]
    createMany?: PortfolioCreateManyProductInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type TestimonialUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<TestimonialCreateWithoutProductInput, TestimonialUncheckedCreateWithoutProductInput> | TestimonialCreateWithoutProductInput[] | TestimonialUncheckedCreateWithoutProductInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutProductInput | TestimonialCreateOrConnectWithoutProductInput[]
    createMany?: TestimonialCreateManyProductInputEnvelope
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type EnumCategoryFieldUpdateOperationsInput = {
    set?: $Enums.Category
  }

  export type EnumProductStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProductStatus
  }

  export type ProductUpdateadditionalImagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CustomFieldListUpdateEnvelopeInput = {
    set?: CustomFieldCreateInput | CustomFieldCreateInput[]
    push?: CustomFieldCreateInput | CustomFieldCreateInput[]
    updateMany?: CustomFieldUpdateManyInput
    deleteMany?: CustomFieldDeleteManyInput
  }

  export type ProductUpdatebundleProductIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProductUpdaterelatedProductIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type QuotationUpdateManyWithoutProductNestedInput = {
    create?: XOR<QuotationCreateWithoutProductInput, QuotationUncheckedCreateWithoutProductInput> | QuotationCreateWithoutProductInput[] | QuotationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutProductInput | QuotationCreateOrConnectWithoutProductInput[]
    upsert?: QuotationUpsertWithWhereUniqueWithoutProductInput | QuotationUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: QuotationCreateManyProductInputEnvelope
    set?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    disconnect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    delete?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    update?: QuotationUpdateWithWhereUniqueWithoutProductInput | QuotationUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: QuotationUpdateManyWithWhereWithoutProductInput | QuotationUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
  }

  export type PortfolioUpdateManyWithoutProductNestedInput = {
    create?: XOR<PortfolioCreateWithoutProductInput, PortfolioUncheckedCreateWithoutProductInput> | PortfolioCreateWithoutProductInput[] | PortfolioUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutProductInput | PortfolioCreateOrConnectWithoutProductInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutProductInput | PortfolioUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: PortfolioCreateManyProductInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutProductInput | PortfolioUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutProductInput | PortfolioUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type TestimonialUpdateManyWithoutProductNestedInput = {
    create?: XOR<TestimonialCreateWithoutProductInput, TestimonialUncheckedCreateWithoutProductInput> | TestimonialCreateWithoutProductInput[] | TestimonialUncheckedCreateWithoutProductInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutProductInput | TestimonialCreateOrConnectWithoutProductInput[]
    upsert?: TestimonialUpsertWithWhereUniqueWithoutProductInput | TestimonialUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: TestimonialCreateManyProductInputEnvelope
    set?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    disconnect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    delete?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    update?: TestimonialUpdateWithWhereUniqueWithoutProductInput | TestimonialUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: TestimonialUpdateManyWithWhereWithoutProductInput | TestimonialUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutProductNestedInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutProductInput | ReviewUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutProductInput | ReviewUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutProductInput | ReviewUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type QuotationUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<QuotationCreateWithoutProductInput, QuotationUncheckedCreateWithoutProductInput> | QuotationCreateWithoutProductInput[] | QuotationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutProductInput | QuotationCreateOrConnectWithoutProductInput[]
    upsert?: QuotationUpsertWithWhereUniqueWithoutProductInput | QuotationUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: QuotationCreateManyProductInputEnvelope
    set?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    disconnect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    delete?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    update?: QuotationUpdateWithWhereUniqueWithoutProductInput | QuotationUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: QuotationUpdateManyWithWhereWithoutProductInput | QuotationUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
  }

  export type PortfolioUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<PortfolioCreateWithoutProductInput, PortfolioUncheckedCreateWithoutProductInput> | PortfolioCreateWithoutProductInput[] | PortfolioUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutProductInput | PortfolioCreateOrConnectWithoutProductInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutProductInput | PortfolioUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: PortfolioCreateManyProductInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutProductInput | PortfolioUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutProductInput | PortfolioUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type TestimonialUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<TestimonialCreateWithoutProductInput, TestimonialUncheckedCreateWithoutProductInput> | TestimonialCreateWithoutProductInput[] | TestimonialUncheckedCreateWithoutProductInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutProductInput | TestimonialCreateOrConnectWithoutProductInput[]
    upsert?: TestimonialUpsertWithWhereUniqueWithoutProductInput | TestimonialUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: TestimonialCreateManyProductInputEnvelope
    set?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    disconnect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    delete?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    update?: TestimonialUpdateWithWhereUniqueWithoutProductInput | TestimonialUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: TestimonialUpdateManyWithWhereWithoutProductInput | TestimonialUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutProductInput | ReviewUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutProductInput | ReviewUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutProductInput | ReviewUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutQuotationsInput = {
    create?: XOR<UserCreateWithoutQuotationsInput, UserUncheckedCreateWithoutQuotationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuotationsInput
    connect?: UserWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutQuotationsInput = {
    create?: XOR<ProductCreateWithoutQuotationsInput, ProductUncheckedCreateWithoutQuotationsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutQuotationsInput
    connect?: ProductWhereUniqueInput
  }

  export type EnumQuotationStatusFieldUpdateOperationsInput = {
    set?: $Enums.QuotationStatus
  }

  export type UserUpdateOneWithoutQuotationsNestedInput = {
    create?: XOR<UserCreateWithoutQuotationsInput, UserUncheckedCreateWithoutQuotationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuotationsInput
    upsert?: UserUpsertWithoutQuotationsInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuotationsInput, UserUpdateWithoutQuotationsInput>, UserUncheckedUpdateWithoutQuotationsInput>
  }

  export type ProductUpdateOneWithoutQuotationsNestedInput = {
    create?: XOR<ProductCreateWithoutQuotationsInput, ProductUncheckedCreateWithoutQuotationsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutQuotationsInput
    upsert?: ProductUpsertWithoutQuotationsInput
    disconnect?: boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutQuotationsInput, ProductUpdateWithoutQuotationsInput>, ProductUncheckedUpdateWithoutQuotationsInput>
  }

  export type QuotationItemListCreateEnvelopeInput = {
    set?: QuotationItemCreateInput | QuotationItemCreateInput[]
  }

  export type QuotationItemCreateInput = {
    description: string
    rate: number
    quantity: number
    amount: number
  }

  export type QuotationItemListUpdateEnvelopeInput = {
    set?: QuotationItemCreateInput | QuotationItemCreateInput[]
    push?: QuotationItemCreateInput | QuotationItemCreateInput[]
    updateMany?: QuotationItemUpdateManyInput
    deleteMany?: QuotationItemDeleteManyInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AttendanceCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput> | AttendanceCreateWithoutEmployeeInput[] | AttendanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutEmployeeInput | AttendanceCreateOrConnectWithoutEmployeeInput[]
    createMany?: AttendanceCreateManyEmployeeInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput> | AttendanceCreateWithoutEmployeeInput[] | AttendanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutEmployeeInput | AttendanceCreateOrConnectWithoutEmployeeInput[]
    createMany?: AttendanceCreateManyEmployeeInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type EnumEmployeeStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmployeeStatus
  }

  export type AttendanceUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput> | AttendanceCreateWithoutEmployeeInput[] | AttendanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutEmployeeInput | AttendanceCreateOrConnectWithoutEmployeeInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutEmployeeInput | AttendanceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AttendanceCreateManyEmployeeInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutEmployeeInput | AttendanceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutEmployeeInput | AttendanceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type AttendanceUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput> | AttendanceCreateWithoutEmployeeInput[] | AttendanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutEmployeeInput | AttendanceCreateOrConnectWithoutEmployeeInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutEmployeeInput | AttendanceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AttendanceCreateManyEmployeeInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutEmployeeInput | AttendanceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutEmployeeInput | AttendanceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutAttendanceInput = {
    create?: XOR<EmployeeCreateWithoutAttendanceInput, EmployeeUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAttendanceInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EnumAttendanceStatusFieldUpdateOperationsInput = {
    set?: $Enums.AttendanceStatus
  }

  export type EmployeeUpdateOneRequiredWithoutAttendanceNestedInput = {
    create?: XOR<EmployeeCreateWithoutAttendanceInput, EmployeeUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAttendanceInput
    upsert?: EmployeeUpsertWithoutAttendanceInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutAttendanceInput, EmployeeUpdateWithoutAttendanceInput>, EmployeeUncheckedUpdateWithoutAttendanceInput>
  }

  export type PortfolioCreateadditionalImagesInput = {
    set: string[]
  }

  export type ProductCreateNestedOneWithoutPortfoliosInput = {
    create?: XOR<ProductCreateWithoutPortfoliosInput, ProductUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPortfoliosInput
    connect?: ProductWhereUniqueInput
  }

  export type PortfolioUpdateadditionalImagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProductUpdateOneWithoutPortfoliosNestedInput = {
    create?: XOR<ProductCreateWithoutPortfoliosInput, ProductUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPortfoliosInput
    upsert?: ProductUpsertWithoutPortfoliosInput
    disconnect?: boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutPortfoliosInput, ProductUpdateWithoutPortfoliosInput>, ProductUncheckedUpdateWithoutPortfoliosInput>
  }

  export type ProductCreateNestedOneWithoutTestimonialsInput = {
    create?: XOR<ProductCreateWithoutTestimonialsInput, ProductUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutTestimonialsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneWithoutTestimonialsNestedInput = {
    create?: XOR<ProductCreateWithoutTestimonialsInput, ProductUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutTestimonialsInput
    upsert?: ProductUpsertWithoutTestimonialsInput
    disconnect?: boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutTestimonialsInput, ProductUpdateWithoutTestimonialsInput>, ProductUncheckedUpdateWithoutTestimonialsInput>
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutReviewsInput = {
    create?: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReviewsInput
    connect?: ProductWhereUniqueInput
  }

  export type EnumReviewStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReviewStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type ProductUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReviewsInput
    upsert?: ProductUpsertWithoutReviewsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutReviewsInput, ProductUpdateWithoutReviewsInput>, ProductUncheckedUpdateWithoutReviewsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
  }

  export type NestedEnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CustomFieldWhereInput = {
    AND?: CustomFieldWhereInput | CustomFieldWhereInput[]
    OR?: CustomFieldWhereInput[]
    NOT?: CustomFieldWhereInput | CustomFieldWhereInput[]
    label?: StringFilter<"CustomField"> | string
    value?: StringFilter<"CustomField"> | string
  }

  export type NestedEnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
  }

  export type NestedEnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumQuotationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotationStatus | EnumQuotationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuotationStatusFilter<$PrismaModel> | $Enums.QuotationStatus
  }

  export type NestedEnumQuotationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotationStatus | EnumQuotationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuotationStatus[] | ListEnumQuotationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuotationStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuotationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuotationStatusFilter<$PrismaModel>
    _max?: NestedEnumQuotationStatusFilter<$PrismaModel>
  }

  export type QuotationItemWhereInput = {
    AND?: QuotationItemWhereInput | QuotationItemWhereInput[]
    OR?: QuotationItemWhereInput[]
    NOT?: QuotationItemWhereInput | QuotationItemWhereInput[]
    description?: StringFilter<"QuotationItem"> | string
    rate?: FloatFilter<"QuotationItem"> | number
    quantity?: IntFilter<"QuotationItem"> | number
    amount?: FloatFilter<"QuotationItem"> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumEmployeeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusFilter<$PrismaModel> | $Enums.EmployeeStatus
  }

  export type NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeStatusFilter<$PrismaModel>
    _max?: NestedEnumEmployeeStatusFilter<$PrismaModel>
  }

  export type NestedEnumAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusFilter<$PrismaModel> | $Enums.AttendanceStatus
  }

  export type NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttendanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttendanceStatusFilter<$PrismaModel>
    _max?: NestedEnumAttendanceStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type NestedEnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewStatusFilter<$PrismaModel>
    _max?: NestedEnumReviewStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type QuotationCreateWithoutUserInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    message: string
    status?: $Enums.QuotationStatus
    quotedPrice?: number | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product?: ProductCreateNestedOneWithoutQuotationsInput
  }

  export type QuotationUncheckedCreateWithoutUserInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    productId?: string | null
    message: string
    status?: $Enums.QuotationStatus
    quotedPrice?: number | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationCreateOrConnectWithoutUserInput = {
    where: QuotationWhereUniqueInput
    create: XOR<QuotationCreateWithoutUserInput, QuotationUncheckedCreateWithoutUserInput>
  }

  export type QuotationCreateManyUserInputEnvelope = {
    data: QuotationCreateManyUserInput | QuotationCreateManyUserInput[]
  }

  export type ReviewCreateWithoutUserInput = {
    id?: string
    rating?: number
    comment: string
    status?: $Enums.ReviewStatus
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: string
    productId: string
    rating?: number
    comment: string
    status?: $Enums.ReviewStatus
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateManyUserInputEnvelope = {
    data: ReviewCreateManyUserInput | ReviewCreateManyUserInput[]
  }

  export type QuotationUpsertWithWhereUniqueWithoutUserInput = {
    where: QuotationWhereUniqueInput
    update: XOR<QuotationUpdateWithoutUserInput, QuotationUncheckedUpdateWithoutUserInput>
    create: XOR<QuotationCreateWithoutUserInput, QuotationUncheckedCreateWithoutUserInput>
  }

  export type QuotationUpdateWithWhereUniqueWithoutUserInput = {
    where: QuotationWhereUniqueInput
    data: XOR<QuotationUpdateWithoutUserInput, QuotationUncheckedUpdateWithoutUserInput>
  }

  export type QuotationUpdateManyWithWhereWithoutUserInput = {
    where: QuotationScalarWhereInput
    data: XOR<QuotationUpdateManyMutationInput, QuotationUncheckedUpdateManyWithoutUserInput>
  }

  export type QuotationScalarWhereInput = {
    AND?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
    OR?: QuotationScalarWhereInput[]
    NOT?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
    id?: StringFilter<"Quotation"> | string
    userId?: StringNullableFilter<"Quotation"> | string | null
    name?: StringNullableFilter<"Quotation"> | string | null
    email?: StringNullableFilter<"Quotation"> | string | null
    phone?: StringNullableFilter<"Quotation"> | string | null
    productId?: StringNullableFilter<"Quotation"> | string | null
    message?: StringFilter<"Quotation"> | string
    status?: EnumQuotationStatusFilter<"Quotation"> | $Enums.QuotationStatus
    quotedPrice?: FloatNullableFilter<"Quotation"> | number | null
    adminNotes?: StringNullableFilter<"Quotation"> | string | null
    createdAt?: DateTimeFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeFilter<"Quotation"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    productId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    status?: EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus
    approvedAt?: DateTimeNullableFilter<"Review"> | Date | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type QuotationCreateWithoutProductInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    message: string
    status?: $Enums.QuotationStatus
    quotedPrice?: number | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutQuotationsInput
  }

  export type QuotationUncheckedCreateWithoutProductInput = {
    id?: string
    userId?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    message: string
    status?: $Enums.QuotationStatus
    quotedPrice?: number | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationCreateOrConnectWithoutProductInput = {
    where: QuotationWhereUniqueInput
    create: XOR<QuotationCreateWithoutProductInput, QuotationUncheckedCreateWithoutProductInput>
  }

  export type QuotationCreateManyProductInputEnvelope = {
    data: QuotationCreateManyProductInput | QuotationCreateManyProductInput[]
  }

  export type PortfolioCreateWithoutProductInput = {
    id?: string
    title: string
    description: string
    imageUrl: string
    additionalImages?: PortfolioCreateadditionalImagesInput | string[]
    location?: string | null
    completionDate?: string | null
    clientName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUncheckedCreateWithoutProductInput = {
    id?: string
    title: string
    description: string
    imageUrl: string
    additionalImages?: PortfolioCreateadditionalImagesInput | string[]
    location?: string | null
    completionDate?: string | null
    clientName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioCreateOrConnectWithoutProductInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutProductInput, PortfolioUncheckedCreateWithoutProductInput>
  }

  export type PortfolioCreateManyProductInputEnvelope = {
    data: PortfolioCreateManyProductInput | PortfolioCreateManyProductInput[]
  }

  export type TestimonialCreateWithoutProductInput = {
    id?: string
    clientName: string
    role?: string | null
    company?: string | null
    content: string
    rating?: number
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestimonialUncheckedCreateWithoutProductInput = {
    id?: string
    clientName: string
    role?: string | null
    company?: string | null
    content: string
    rating?: number
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestimonialCreateOrConnectWithoutProductInput = {
    where: TestimonialWhereUniqueInput
    create: XOR<TestimonialCreateWithoutProductInput, TestimonialUncheckedCreateWithoutProductInput>
  }

  export type TestimonialCreateManyProductInputEnvelope = {
    data: TestimonialCreateManyProductInput | TestimonialCreateManyProductInput[]
  }

  export type ReviewCreateWithoutProductInput = {
    id?: string
    rating?: number
    comment: string
    status?: $Enums.ReviewStatus
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutProductInput = {
    id?: string
    userId: string
    rating?: number
    comment: string
    status?: $Enums.ReviewStatus
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutProductInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput>
  }

  export type ReviewCreateManyProductInputEnvelope = {
    data: ReviewCreateManyProductInput | ReviewCreateManyProductInput[]
  }

  export type CustomFieldUpdateManyInput = {
    where: CustomFieldWhereInput
    data: CustomFieldUpdateInput
  }

  export type CustomFieldDeleteManyInput = {
    where: CustomFieldWhereInput
  }

  export type QuotationUpsertWithWhereUniqueWithoutProductInput = {
    where: QuotationWhereUniqueInput
    update: XOR<QuotationUpdateWithoutProductInput, QuotationUncheckedUpdateWithoutProductInput>
    create: XOR<QuotationCreateWithoutProductInput, QuotationUncheckedCreateWithoutProductInput>
  }

  export type QuotationUpdateWithWhereUniqueWithoutProductInput = {
    where: QuotationWhereUniqueInput
    data: XOR<QuotationUpdateWithoutProductInput, QuotationUncheckedUpdateWithoutProductInput>
  }

  export type QuotationUpdateManyWithWhereWithoutProductInput = {
    where: QuotationScalarWhereInput
    data: XOR<QuotationUpdateManyMutationInput, QuotationUncheckedUpdateManyWithoutProductInput>
  }

  export type PortfolioUpsertWithWhereUniqueWithoutProductInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutProductInput, PortfolioUncheckedUpdateWithoutProductInput>
    create: XOR<PortfolioCreateWithoutProductInput, PortfolioUncheckedCreateWithoutProductInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutProductInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutProductInput, PortfolioUncheckedUpdateWithoutProductInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutProductInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutProductInput>
  }

  export type PortfolioScalarWhereInput = {
    AND?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    OR?: PortfolioScalarWhereInput[]
    NOT?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    title?: StringFilter<"Portfolio"> | string
    description?: StringFilter<"Portfolio"> | string
    imageUrl?: StringFilter<"Portfolio"> | string
    additionalImages?: StringNullableListFilter<"Portfolio">
    location?: StringNullableFilter<"Portfolio"> | string | null
    completionDate?: StringNullableFilter<"Portfolio"> | string | null
    clientName?: StringNullableFilter<"Portfolio"> | string | null
    productId?: StringNullableFilter<"Portfolio"> | string | null
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
  }

  export type TestimonialUpsertWithWhereUniqueWithoutProductInput = {
    where: TestimonialWhereUniqueInput
    update: XOR<TestimonialUpdateWithoutProductInput, TestimonialUncheckedUpdateWithoutProductInput>
    create: XOR<TestimonialCreateWithoutProductInput, TestimonialUncheckedCreateWithoutProductInput>
  }

  export type TestimonialUpdateWithWhereUniqueWithoutProductInput = {
    where: TestimonialWhereUniqueInput
    data: XOR<TestimonialUpdateWithoutProductInput, TestimonialUncheckedUpdateWithoutProductInput>
  }

  export type TestimonialUpdateManyWithWhereWithoutProductInput = {
    where: TestimonialScalarWhereInput
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyWithoutProductInput>
  }

  export type TestimonialScalarWhereInput = {
    AND?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
    OR?: TestimonialScalarWhereInput[]
    NOT?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
    id?: StringFilter<"Testimonial"> | string
    clientName?: StringFilter<"Testimonial"> | string
    role?: StringNullableFilter<"Testimonial"> | string | null
    company?: StringNullableFilter<"Testimonial"> | string | null
    content?: StringFilter<"Testimonial"> | string
    rating?: IntFilter<"Testimonial"> | number
    imageUrl?: StringNullableFilter<"Testimonial"> | string | null
    productId?: StringNullableFilter<"Testimonial"> | string | null
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
    updatedAt?: DateTimeFilter<"Testimonial"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutProductInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutProductInput, ReviewUncheckedUpdateWithoutProductInput>
    create: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutProductInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutProductInput, ReviewUncheckedUpdateWithoutProductInput>
  }

  export type ReviewUpdateManyWithWhereWithoutProductInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutProductInput>
  }

  export type UserCreateWithoutQuotationsInput = {
    id?: string
    name: string
    email: string
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQuotationsInput = {
    id?: string
    name: string
    email: string
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQuotationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuotationsInput, UserUncheckedCreateWithoutQuotationsInput>
  }

  export type ProductCreateWithoutQuotationsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutProductInput
    testimonials?: TestimonialCreateNestedManyWithoutProductInput
    reviews?: ReviewCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutQuotationsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutProductInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProductInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutQuotationsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutQuotationsInput, ProductUncheckedCreateWithoutQuotationsInput>
  }

  export type UserUpsertWithoutQuotationsInput = {
    update: XOR<UserUpdateWithoutQuotationsInput, UserUncheckedUpdateWithoutQuotationsInput>
    create: XOR<UserCreateWithoutQuotationsInput, UserUncheckedCreateWithoutQuotationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuotationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuotationsInput, UserUncheckedUpdateWithoutQuotationsInput>
  }

  export type UserUpdateWithoutQuotationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQuotationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProductUpsertWithoutQuotationsInput = {
    update: XOR<ProductUpdateWithoutQuotationsInput, ProductUncheckedUpdateWithoutQuotationsInput>
    create: XOR<ProductCreateWithoutQuotationsInput, ProductUncheckedCreateWithoutQuotationsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutQuotationsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutQuotationsInput, ProductUncheckedUpdateWithoutQuotationsInput>
  }

  export type ProductUpdateWithoutQuotationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutProductNestedInput
    testimonials?: TestimonialUpdateManyWithoutProductNestedInput
    reviews?: ReviewUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutQuotationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutProductNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProductNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
  }

  export type QuotationItemUpdateManyInput = {
    where: QuotationItemWhereInput
    data: QuotationItemUpdateInput
  }

  export type QuotationItemDeleteManyInput = {
    where: QuotationItemWhereInput
  }

  export type AttendanceCreateWithoutEmployeeInput = {
    id?: string
    date: Date | string
    status: $Enums.AttendanceStatus
    hours?: number | null
    remarks?: string | null
    wages?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceUncheckedCreateWithoutEmployeeInput = {
    id?: string
    date: Date | string
    status: $Enums.AttendanceStatus
    hours?: number | null
    remarks?: string | null
    wages?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceCreateOrConnectWithoutEmployeeInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput>
  }

  export type AttendanceCreateManyEmployeeInputEnvelope = {
    data: AttendanceCreateManyEmployeeInput | AttendanceCreateManyEmployeeInput[]
  }

  export type AttendanceUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutEmployeeInput, AttendanceUncheckedUpdateWithoutEmployeeInput>
    create: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutEmployeeInput, AttendanceUncheckedUpdateWithoutEmployeeInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutEmployeeInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type AttendanceScalarWhereInput = {
    AND?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    OR?: AttendanceScalarWhereInput[]
    NOT?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    id?: StringFilter<"Attendance"> | string
    employeeId?: StringFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    status?: EnumAttendanceStatusFilter<"Attendance"> | $Enums.AttendanceStatus
    hours?: FloatNullableFilter<"Attendance"> | number | null
    remarks?: StringNullableFilter<"Attendance"> | string | null
    wages?: FloatNullableFilter<"Attendance"> | number | null
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
  }

  export type EmployeeCreateWithoutAttendanceInput = {
    id?: string
    firstName: string
    lastName: string
    phoneNumber: string
    designation: string
    joiningDate?: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeUncheckedCreateWithoutAttendanceInput = {
    id?: string
    firstName: string
    lastName: string
    phoneNumber: string
    designation: string
    joiningDate?: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeCreateOrConnectWithoutAttendanceInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutAttendanceInput, EmployeeUncheckedCreateWithoutAttendanceInput>
  }

  export type EmployeeUpsertWithoutAttendanceInput = {
    update: XOR<EmployeeUpdateWithoutAttendanceInput, EmployeeUncheckedUpdateWithoutAttendanceInput>
    create: XOR<EmployeeCreateWithoutAttendanceInput, EmployeeUncheckedCreateWithoutAttendanceInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutAttendanceInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutAttendanceInput, EmployeeUncheckedUpdateWithoutAttendanceInput>
  }

  export type EmployeeUpdateWithoutAttendanceInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    joiningDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateWithoutAttendanceInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    joiningDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateWithoutPortfoliosInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationCreateNestedManyWithoutProductInput
    testimonials?: TestimonialCreateNestedManyWithoutProductInput
    reviews?: ReviewCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutPortfoliosInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationUncheckedCreateNestedManyWithoutProductInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProductInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutPortfoliosInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutPortfoliosInput, ProductUncheckedCreateWithoutPortfoliosInput>
  }

  export type ProductUpsertWithoutPortfoliosInput = {
    update: XOR<ProductUpdateWithoutPortfoliosInput, ProductUncheckedUpdateWithoutPortfoliosInput>
    create: XOR<ProductCreateWithoutPortfoliosInput, ProductUncheckedCreateWithoutPortfoliosInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutPortfoliosInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutPortfoliosInput, ProductUncheckedUpdateWithoutPortfoliosInput>
  }

  export type ProductUpdateWithoutPortfoliosInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUpdateManyWithoutProductNestedInput
    testimonials?: TestimonialUpdateManyWithoutProductNestedInput
    reviews?: ReviewUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutPortfoliosInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUncheckedUpdateManyWithoutProductNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProductNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutTestimonialsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationCreateNestedManyWithoutProductInput
    portfolios?: PortfolioCreateNestedManyWithoutProductInput
    reviews?: ReviewCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutTestimonialsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationUncheckedCreateNestedManyWithoutProductInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutProductInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutTestimonialsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutTestimonialsInput, ProductUncheckedCreateWithoutTestimonialsInput>
  }

  export type ProductUpsertWithoutTestimonialsInput = {
    update: XOR<ProductUpdateWithoutTestimonialsInput, ProductUncheckedUpdateWithoutTestimonialsInput>
    create: XOR<ProductCreateWithoutTestimonialsInput, ProductUncheckedCreateWithoutTestimonialsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutTestimonialsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutTestimonialsInput, ProductUncheckedUpdateWithoutTestimonialsInput>
  }

  export type ProductUpdateWithoutTestimonialsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUpdateManyWithoutProductNestedInput
    portfolios?: PortfolioUpdateManyWithoutProductNestedInput
    reviews?: ReviewUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutTestimonialsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUncheckedUpdateManyWithoutProductNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutProductNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserCreateWithoutReviewsInput = {
    id?: string
    name: string
    email: string
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string
    name: string
    email: string
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type ProductCreateWithoutReviewsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationCreateNestedManyWithoutProductInput
    portfolios?: PortfolioCreateNestedManyWithoutProductInput
    testimonials?: TestimonialCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutReviewsInput = {
    id?: string
    title: string
    description: string
    category: $Enums.Category
    subCategory?: string | null
    sku?: string | null
    slug?: string | null
    status?: $Enums.ProductStatus
    imageUrl: string
    additionalImages?: ProductCreateadditionalImagesInput | string[]
    price?: number | null
    mrp?: number | null
    discountPercentage?: number | null
    stock?: number
    companyName?: string | null
    isBestProduct?: boolean
    customFields?: XOR<CustomFieldListCreateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductCreatebundleProductIdsInput | string[]
    relatedProductIds?: ProductCreaterelatedProductIdsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationUncheckedCreateNestedManyWithoutProductInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutProductInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutReviewsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProductUpsertWithoutReviewsInput = {
    update: XOR<ProductUpdateWithoutReviewsInput, ProductUncheckedUpdateWithoutReviewsInput>
    create: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutReviewsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutReviewsInput, ProductUncheckedUpdateWithoutReviewsInput>
  }

  export type ProductUpdateWithoutReviewsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUpdateManyWithoutProductNestedInput
    portfolios?: PortfolioUpdateManyWithoutProductNestedInput
    testimonials?: TestimonialUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutReviewsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: ProductUpdateadditionalImagesInput | string[]
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    mrp?: NullableFloatFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    stock?: IntFieldUpdateOperationsInput | number
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    isBestProduct?: BoolFieldUpdateOperationsInput | boolean
    customFields?: XOR<CustomFieldListUpdateEnvelopeInput, CustomFieldCreateInput> | CustomFieldCreateInput[]
    bundleProductIds?: ProductUpdatebundleProductIdsInput | string[]
    relatedProductIds?: ProductUpdaterelatedProductIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUncheckedUpdateManyWithoutProductNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutProductNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProductNestedInput
  }

  export type QuotationCreateManyUserInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    productId?: string | null
    message: string
    status?: $Enums.QuotationStatus
    quotedPrice?: number | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyUserInput = {
    id?: string
    productId: string
    rating?: number
    comment: string
    status?: $Enums.ReviewStatus
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationUpdateWithoutUserInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneWithoutQuotationsNestedInput
  }

  export type QuotationUncheckedUpdateWithoutUserInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationUncheckedUpdateManyWithoutUserInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutUserInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationCreateManyProductInput = {
    id?: string
    userId?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    message: string
    status?: $Enums.QuotationStatus
    quotedPrice?: number | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioCreateManyProductInput = {
    id?: string
    title: string
    description: string
    imageUrl: string
    additionalImages?: PortfolioCreateadditionalImagesInput | string[]
    location?: string | null
    completionDate?: string | null
    clientName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestimonialCreateManyProductInput = {
    id?: string
    clientName: string
    role?: string | null
    company?: string | null
    content: string
    rating?: number
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyProductInput = {
    id?: string
    userId: string
    rating?: number
    comment: string
    status?: $Enums.ReviewStatus
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFieldUpdateInput = {
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type QuotationUpdateWithoutProductInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutQuotationsNestedInput
  }

  export type QuotationUncheckedUpdateWithoutProductInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationUncheckedUpdateManyWithoutProductInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumQuotationStatusFieldUpdateOperationsInput | $Enums.QuotationStatus
    quotedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUpdateWithoutProductInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: PortfolioUpdateadditionalImagesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateWithoutProductInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: PortfolioUpdateadditionalImagesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyWithoutProductInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    additionalImages?: PortfolioUpdateadditionalImagesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUpdateWithoutProductInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateWithoutProductInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateManyWithoutProductInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutProductInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationItemUpdateInput = {
    description?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
  }

  export type AttendanceCreateManyEmployeeInput = {
    id?: string
    date: Date | string
    status: $Enums.AttendanceStatus
    hours?: number | null
    remarks?: string | null
    wages?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceUpdateWithoutEmployeeInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    hours?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    wages?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateWithoutEmployeeInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    hours?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    wages?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyWithoutEmployeeInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    hours?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    wages?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}