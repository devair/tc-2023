import { container } from  'tsyringe';
import { ICategoriesRepository } from '../../ports/repositories/ICategoriesRepository';
import { IProductsRepository } from '../../ports/repositories/IProductsRepository';
import { ProductsRepositoryInMemory } from '../../adapters/repositories/in-memory/ProductsRepositoryInMemory';
import { ICustomersRepository } from '../../ports/repositories/ICustomersRepository';
import { IOrdersRepository } from '../../ports/repositories/IOrdersRepository';
import { OrdersRepositoryInMemory } from '../../adapters/repositories/in-memory/OrdersRepositoryInMemory';
import { IPaymentsRepository } from '../../ports/repositories/IPaymentsRepository';
import { PaymentsRepositoryInMemory } from '../../adapters/repositories/in-memory/PaymentsRepositoryInMemory';
import { ICategoriesService } from '../../services/category/ICategoriesService';
import { CategoriesService } from '../../services/category/impl/CategoriesService';
import { IProductsService } from '../../services/product/IProductsService';
import { ProductsService } from '../../services/product/impl/ProductsService';
import { ICustomersService } from '../../services/customer/ICustomersService';
import { CustomersService } from '../../services/customer/impl/CustomersService';
import { IOrdersService } from '../../services/order/IOrdersService';
import { OrdersService } from '../../services/order/impl/OrdersService';
import { CategoriesRepositoryPostgres } from '../../adapters/repositories/postgress/CategoriesRepositoryPostgres';
import { CustomersRepositoryPostgres } from '../../adapters/repositories/postgress/CustomersRepositoryPostgres';

//TODO: to use a real database implementation
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository', CategoriesRepositoryPostgres
);
 
container.registerSingleton<IProductsRepository>(
    'ProductsRepository', ProductsRepositoryInMemory
);

container.registerSingleton<ICustomersRepository>(
    'CustomersRepository', CustomersRepositoryPostgres
);

container.registerSingleton<IOrdersRepository>(
    'OrdersRepository', OrdersRepositoryInMemory
);

container.registerSingleton<IPaymentsRepository>(
    'PaymentsRepository', PaymentsRepositoryInMemory
);

container.registerSingleton<ICategoriesService>(
    'CategoriesService', CategoriesService
)

container.registerSingleton<IProductsService>(
    'ProductsService', ProductsService
)

container.registerSingleton<ICustomersService>(
    'CustomersService', CustomersService
)

container.registerSingleton<IOrdersService>(
    'OrdersService', OrdersService
)