import { container } from  'tsyringe';
import { ICategoriesRepository } from '../../clean/communication/gateway/repositories/ICategoriesRepository';
import { IProductsRepository } from '../../clean/communication/gateway/repositories/IProductsRepository';
import { ICustomersRepository } from '../../clean/communication/gateway/repositories/ICustomersRepository';
import { IOrdersRepository } from '../../clean/communication/gateway/repositories/IOrdersRepository';
import { IPaymentsRepository } from '../../clean/communication/gateway/repositories/IPaymentsRepository';
import { ICategoriesService } from '../../services/category/ICategoriesService';
import { CategoriesService } from '../../services/category/impl/CategoriesService';
import { IProductsService } from '../../services/product/IProductsService';
import { ProductsService } from '../../services/product/impl/ProductsService';
import { ICustomersService } from '../../services/customer/ICustomersService';
import { CustomersService } from '../../services/customer/impl/CustomersService';
import { IOrdersService } from '../../services/order/IOrdersService';
import { OrdersService } from '../../services/order/impl/OrdersService';
import { CategoriesRepositoryPostgres } from '../../adapters/repositories/postgres/CategoriesRepositoryPostgres';
import { CustomersRepositoryPostgres } from '../../adapters/repositories/postgres/CustomersRepositoryPostgres';
import { ProductsRepositoryPostgres } from '../../adapters/repositories/postgres/ProductsRepositoryPostgres';
import { OrdersRepositoryPostgres } from '../../adapters/repositories/postgres/OrdersRepositoryPostgres';
import { PaymentsRepositoryPostgres } from '../../adapters/repositories/postgres/PaymentsRepositoryPostgres';
import { IPaymentsService } from '../../services/payment/IPaymentsService';
import { PaymentsService } from '../../services/payment/impl/PaymentsService';
import { IOrderItemsRepository } from '../../clean/communication/gateway/repositories/IOrderItemsRepository';
import { OrderItemsRepositoryPostgres } from '../../adapters/repositories/postgres/OrderItemsRepositoryPostgres';

//TODO: to use a real database implementation
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository', CategoriesRepositoryPostgres
);
 
container.registerSingleton<IProductsRepository>(
    'ProductsRepository', ProductsRepositoryPostgres
);

container.registerSingleton<ICustomersRepository>(
    'CustomersRepository', CustomersRepositoryPostgres
);

container.registerSingleton<IOrdersRepository>(
    'OrdersRepository', OrdersRepositoryPostgres
);

container.registerSingleton<IPaymentsRepository>(
    'PaymentsRepository', PaymentsRepositoryPostgres
);

container.registerSingleton<IOrderItemsRepository>(
    'OrderItemsRepository', OrderItemsRepositoryPostgres
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

container.registerSingleton<IPaymentsService>(
    'PaymentsService', PaymentsService
)