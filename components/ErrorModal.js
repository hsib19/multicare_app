import React from 'react';
import Modal from "react-native-modal";
import { Block, Text } from '.';
import { Image } from 'react-native-elements';

export default class ErrorModal extends React.Component{

    constructor(){
        super();
        this.state = {
            modalError: true
        }
    }

    render(){
        return (
                <Modal
                    testID={'modal'}
                    isVisible={this.state.modalError}
                    swipeDirection={['down']}
                    onSwipeComplete={() => this.setState({modalError: !this.state.modalError})}
                    style={{justifyContent: 'flex-end', margin: 0,}}
                    onSwipeComplete={() => this.setState({modalError: !this.state.modalError})}
                    onBackdropPress={() => this.setState({modalError: !this.state.modalError})}
                    
                    >
                    <Block row white flex={false} padding={20} style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                        <Block flex={false} style={{ width: '58%', marginRight: 5 }} center middle>
                            <Text bold primary middle center style={{ textTransform: 'capitalize' }}>{this.props.messageError}</Text>
                        </Block>
                        <Block flex={false} style={{ width: '40%' }}>
                            <Image 
                                source={{uri: 'https://i.postimg.cc/wTQw50G2/3298067.jpg'}}
                                style={{ height: 150, width: '100%' }}
                            />
                        </Block>
                    </Block>
                </Modal>
        )
    }
}