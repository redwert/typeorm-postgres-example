import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Offer from './offer.entity'

@Entity('Lender')
export default class Lender {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  name: string

  @Column('varchar')
  email: string | null

  @OneToMany(() => Offer, offer => offer.lender)
  offers: Offer[]
}
