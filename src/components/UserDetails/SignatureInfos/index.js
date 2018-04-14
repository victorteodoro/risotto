/* eslint-disable */
// General imports from libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { map, addIndex } from 'ramda';

// Import styles
import styles from './styles.css';

// Importing assets
import subsLucas from '../../../resources/SignatureScreen/inputs/subsLucas';
import MundipaggRecurrencyConnector from '../../../helpers/recurrency';

const mapIndexed = addIndex(map);

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: this.props.isModalOpen,
      formDiscounts: false,
      formItens: false,
      discountsValue:'discountsvalue1',
      discountsType:'flat',
      discountsCycles:'1',
      itensName:'itensname',
      itensDescription:'itensdescription',
      itensValue:'itensvalue',
      itensCycles:'1'
    };
    this.modalToggle = this.modalToggle.bind(this);
    this.openFormDiscounts = this.openFormDiscounts.bind(this);
    this.openFormItens = this.openFormItens.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addDiscounts = this.addDiscounts.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let field = event.target.name;
    this.setState({
      [field]: event.target.value
    });
  }
  
  itemObj(itens, index) {
    let itemName;
    let itemValue;
    let itemQuantity;

    itemValue = 'R$' + itens.pricingScheme.price / 100;

    return (
      <div className={styles.itemRow} key={index} >
        <div>
          Nome: {itens.description}
        </div>
        <div>
          Valor: {itemValue}
        </div>
        <div>
          Quantidade: {itens.quantity}
        </div>
      </div>
    )
  }

  discountObj(discount, index) {
    let discountType;
    let discountStatus;
    let discountAmount;

    discountAmount = discount.value;

    if (discount.discount_type == 'flat') {
      discountType = 'Reais'
      discountAmount = 'R$' + discount.value / 100;
    } else {
      discountType = 'Percentual'
    }
    
    if (discount.status == 'active') {
      discountStatus = 'Ativo'
    } else {
      discountStatus = 'Inativo'
    }

    return (
      <div className={styles.discountRow} key={index} >
        <div>
          Valor: {discountAmount}
      </div>
        <div>
          Tipo: {discountType}
      </div>
        <div>
          Status: {discountStatus}
      </div>
      </div>
    )
  }

  listDiscounts(discounts) {
    let i = 0;
    let discountsList = ``;
    for (i=0; i<discounts.length; i++) {
      discountsList = discountsList + 
      `Desconto ${i}
      id: ${ discounts[i].id },
       value: ${discounts[i].value},
       discount_type: ${discounts[i].discount_type},
       cycles: ${discounts[i].cycles},
       status: ${discounts[i].status},
       createdAt: ${discounts[i].createdAt}
      `;
    }
    console.log('discountsList ->', discountsList);
    return discountsList;
  }
  listItens(itens) {
    let i = 0;
    let itensList = '';
    for (i=0; i<itens.length; i++) {
      itensList = itensList + 
      `Item ${i}
       Descrição: ${ itens[i].description },
       Quantidade: ${itens[i].quantity},
       Valor: ${itens[i].pricingScheme.price}
      `;
    }
    return itensList;
  }
  modalToggle() {
    this.setState({ modalOpened: !this.state.modalOpened })
  }
  openFormDiscounts() {
    this.setState({ formDiscounts: !this.state.formDiscounts }, _ => {
    })
  }
  addItem() {
    console.log('this.state (add itens) ->', this.state);
  }
  addDiscounts() {
    console.log('this.state (add discounts) ->', this.state);
    console.log('this.state (add discounts) aa ->', 'aaaa');
  }
  openFormItens() {
    this.setState({ formItens: !this.state.formItens }, _ => {
    })
  }
  render() {
    if(this.state.modalOpened==false) {
      return null;
    }
    else{
      // Altea os valores das variáveis coverClass e containerClass, que dão estilo 'block' ou
      //'none' ao modal;
      const coverClass = this.props.isModalOpen ? styles.modalCoverActive : styles.modalCover;
      const containerClass = this.props.isModalOpen ?
      styles.modalContainerActive : styles.modalContainer;
      const divTextDiscounts = this.state.formDiscounts ? styles.modalDiscountsTextFalse : styles.modalDiscountsTextTrue
      const divFormDiscounts = this.state.formDiscounts ? styles.modalDiscountsFormTrue : styles.modalDiscountsFormFalse
      const divTextItens = this.state.formItens ? styles.modalItensTextFalse : styles.modalItensTextTrue
      const divFormItens = this.state.formItens ? styles.modalItensFormTrue : styles.modalItensFormFalse
      return (
        <div>
          <div className={containerClass}>
            <div className={styles.modalGrid}>
              <div className={styles.modalHeader}>
                <div className={styles.modalPlanName}>
                  {this.props.input[this.props.inputIndex].plan.name}
                </div>
                <div className={styles.modalPlanData}>
                  <p>Id do plano: <span>{this.props.input[this.props.inputIndex].plan.id}</span></p>
                </div>
                <div className={styles.modalPlanData}>
                  <p>Periodicidade: <span>{this.props.input[this.props.inputIndex].plan.interval} {this.props.input[this.props.inputIndex].billingType}</span></p>
                </div>
                <div className={styles.modalPlanData}>
                  <p>Período: <span>{this.props.input[this.props.inputIndex].plan.interval_count}</span></p>
                </div>
                <div className={styles.modalPlanData}>
                  <p>Valor: <span>R$ {this.props.amount}</span></p>
                </div>
                <div className={styles.modalPlanData}>
                  <p>Começo em: <span>{this.props.input[this.props.inputIndex].currentCycle.startAt.substring(0, 10)}</span></p>
                </div>
                <div className={styles.modalPlanData}>
                  <p>Término em: <span>{this.props.input[this.props.inputIndex].currentCycle.endAt.substring(0, 10)}</span></p>
                </div>
                <div className={styles.modalPlanData}>
                  <p>Próxima cobrança: <span>{this.props.input[this.props.inputIndex].currentCycle.billingAt.substring(0, 10)}</span></p>
                </div>
                <div className={styles.modalPlanData}>
                  <p>Payment Method: <span>{this.props.input[this.props.inputIndex].paymentMethod}</span></p>
                </div>
              </div>
              <div className={styles.modalDiscountsDiv}>
                <div className={styles.modalDiscountsTitle}>
                  Descontos
                </div>
                <div className={styles.modalBtn1} >
                  <button className={styles.btn} onClick={this.openFormDiscounts}>Add</button>
                </div>
                <div className={divTextDiscounts}>
                  {
                    mapIndexed(this.discountObj, this.props.input[this.props.inputIndex].discounts)
                  }
                </div>
                <div className={divFormDiscounts}>
                  <div>Valor (centavos):</div>
                  <div>
                    <form>
                      <input
                        type='text'
                        name='discountsValue'
                        onChange={this.handleChange}
                        className={styles.modalInput40}/>
                    </form>
                  </div>
                  <div>Tipo do desconto:</div>
                  <div>
                    <form>
                      <select
                        className={styles.modalSelectInput}
                        name='discountsType'
                        onChange={this.handleChange}
                        defaultValue='flat'>
                        <option value="flat">Reais</option>
                        <option value="percentage">Porcentagem</option>
                      </select>
                    </form>
                  </div>
                  <div>Ciclos de cobrança:</div>
                  <div>
                    <form>
                      <select
                        className={styles.modalSelectInput}
                        name='discountsCycles'
                        onChange={this.handleChange}
                        defaultValue='1'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="99">99</option>
                      </select>
                    </form>
                  </div>
                  <div className={styles.modalFormDiscountsBtn}>
                    <button className={styles.btn} onClick={this.addDiscounts} >Adicionar desconto</button>
                  </div>
                </div>
              </div>
              <div className={styles.modalItensDiv}>
                <div className={styles.modalItensTitle}>
                  Itens
                </div>
                <div className={styles.modalBtn1} >
                  <button className={styles.btn} onClick={this.openFormItens} >Add</button>
                </div>

                {/* //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                {/* //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                {/* //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}

                <div className={divTextItens}>
                  {
                    mapIndexed(this.itemObj, this.props.input[this.props.inputIndex].itens)
                  }
                </div>
                <div className={divFormItens}>
                  <div>Nome:</div>
                  <div>
                    <form>
                      <input
                        type='text'
                        name='itensName'
                        onChange={this.handleChange}
                        className={styles.modalInput80}/>
                    </form>
                  </div>
                  <div>Descrição:</div>
                  <div>
                    <form>
                      <input
                        type='text'
                        name='itensDescription'
                        onChange={this.handleChange}
                        className={styles.modalInput80}/>
                    </form>
                  </div>
                  <div>Valor (centavos):</div>
                  <div>
                    <form>
                      <input
                        type='text'
                        name='itensValue'
                        onChange={this.handleChange}
                        className={styles.modalInput40} />
                    </form>
                  </div>
                  <div>Ciclos de cobrança:</div>
                  <div>
                    <form>
                      <select
                        className={styles.modalSelectInput}
                        name='itensCycles'
                        onChange={this.handleChange}
                        defaultValue='1'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="99">99</option>
                      </select>
                    </form>
                  </div>
                  <div className={styles.modalFormItensBtn}>
                    <button className={styles.btn} onClick={this.addItem} >Adicionar item</button>
                  </div>
                </div>
              </div>
              <div className={styles.modalMetadata}>
                Metadata: ID -> {this.props.input[this.props.inputIndex].metadata.id}
              </div>
            </div>
          </div>
        <div className={coverClass} onClick={this.modalToggle}></div>
      </div>
      );
    }
  }
}

//  SIGNATURE INFO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

class SignatureInfos extends React.Component {
  constructor(props) {
    super(props);
    // set initial state
    this.state = {
      isModalOpen: false,
      subscriptionIndex: '0',
      amount: '0'
    };
    this.modalToggle2 = this.modalToggle2.bind(this);
  }

  //modalToggle2: Alterar estado do para que o modal seja aberto
  modalToggle2(index, amount) {
    this.setState(
      {
        isModalOpen: !this.state.isModalOpen, teste: 'oier',
        subscriptionIndex: index,
        amount: amount
      },
  );
  }
  // modalToggle2(e) {
  //   this.setState({ isModalOpen: !this.state.isModalOpen, teste: 'oier' });
  //   console.log('modaltoggle2 this -> ', e)
  // }

  //Popula as linhas de assinaturas de acordo com um input dado
  populateSubscriptions(subsInfos, index, self) {
    let amount = 0;
    let discountPercent = 0;
    let discountAmount = 0;
    let i = 0;
    let j = 0;

    // Calculando o amount da assinatura, 
    // já que não vem nessa requisição o valor fechado, apenas os itens e descontos
    for (i = 0; i < subsInfos.itens.length; i++) {
      amount = amount + parseInt(subsInfos.itens[i].pricingScheme.price);
    }
    for (j = 0; i < subsInfos.discounts.length; j++) {
      if (subsInfos.discounts[j].discount_type == 'percentage') {
        discountPercent = discountPercent + parseInt(subsInfos.discounts[j].value);
      } else {
        discountAmount = discountAmount + parseInt(subsInfos.discounts[j].value);
      }
    }
    amount = (amount * ((100 - discountPercent) / 100) - discountAmount) / 100;

    //Retornando as linhas de assinaturas
    return (
      //  A arrowfunction do onClick é necessaria para que possamos mandar argumentos para o modalToggle2
      //  É preciso mandar argumentos para o modalToggle2 para que saibamos depois quais dados exibit no modal
      <div key={index} className={styles.rowModal} onClick={() => self.modalToggle2(index, amount)}>
        <div className={styles.plan}>{subsInfos.plan.name}</div>
        <div className={styles.startDate}>{subsInfos.startDate.substring(0, 10)}</div>
        <div className={styles.endDate}>---</div>
        <div className={styles.amount}>{`R$${amount}`}</div>
      </div>
    )
  }
    
    render() {
      return (
        <div className={styles.signatureInfos}>
          <div className={styles.row} ref='modalDiv'>
              {(this.state.isModalOpen ? <Modal amount={this.state.amount} inputIndex={this.state.subscriptionIndex} input={subsLucas} isModalOpen={this.state.isModalOpen} /> : null)}
          </div>
          <div className={styles.signatureListTitle} onClick={this.modalToggle2} >Assinaturas</div>
          <div className={styles.plan}>Plano:</div>
          <div className={styles.startDate}>Início:</div>
          <div className={styles.endDate}>Fim:</div>
          <div className={styles.amount}>Valor:</div>
          {/* Populando a div de assinaturas, passando a função populate, 
          os inputs (subsLucas) e o objeto this para servir como referência para as funções posteriores */}
          {
            mapIndexed(this.populateSubscriptions, subsLucas, this)
          }
        </div>
    );
  }
}

export default SignatureInfos;
/* eslint-enable */
