import { container } from  'tsyringe';
import { ICategoriesRepository } from '../../ports/repositories/ICategoriesRepository';
import { IProductsRepository } from '../../ports/repositories/IProductsRepository';
import { ProductsRepositoryInMemory } from '../../adapters/repositories/in-memory/ProductsRepositoryInMemory';
import { ICustomersRepository } from '../../ports/repositories/ICustomersRepository';
import { CustomersRepositoryInMemory } from '../../adapters/repositories/in-memory/CustomersRepositoryInMemory';
import { IOrdersRepository } from '../../ports/repositories/IOrdersRepository';
import { OrdersRepositoryInMemory } from '../../adapters/repositories/in-memory/OrdersRepositoryInMemory';
import { IPaymentsRepository } from '../../ports/repositories/IPaymentsRepository';
import { PaymentsRepositoryInMemory } from '../../adapters/repositories/in-memory/PaymentsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '../../adapters/repositories/in-memory/CategoriesRepositoryInMemory';

//TODO: to use a real database implementation
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository', CategoriesRepositoryInMemory
);
 
container.registerSingleton<IProductsRepository>(
    'ProductsRepository', ProductsRepositoryInMemory
);

container.registerSingleton<ICustomersRepository>(
    'CustomersRepository', CustomersRepositoryInMemory
);

container.registerSingleton<IOrdersRepository>(
    'OrdersRepository', OrdersRepositoryInMemory
);

container.registerSingleton<IPaymentsRepository>(
    'PaymentsRepository', PaymentsRepositoryInMemory
);
