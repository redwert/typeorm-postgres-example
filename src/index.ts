// Must be at top
import 'reflect-metadata';

import { createConnection } from 'typeorm';

import { typeOrmConfig } from './config';
import Offer from './models/offer.entity'

(async () => {
    // App's main content. For example, this could be an Express or console app.
    const conn = await createConnection(typeOrmConfig)

    const rateSumAlias = 'rateSum'
    const rateSumCase = '( CASE WHEN Offer.rate = 0 THEN 0 ELSE 1 END )'

    await conn.getRepository(Offer)
      .createQueryBuilder('Offer')
      .addSelect(rateSumCase, rateSumAlias)
      .innerJoinAndSelect('Offer.lender', 'Lender')
      .groupBy('Offer.id')
      .orderBy(rateSumAlias, 'ASC')
      .skip(10)
      .take(1)
      .getRawAndEntities()

    // Close connection
    await conn.close()
})();
