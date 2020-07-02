import React, {Component} from 'react'
import Modal from '../../components/UI/modal/Modal'

const WithErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            })
            axios.interceptors.response.use(res => res, error => this.setState({error:error.message}))
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render() {
            return (
                <div>
                    <Modal show={this.state.error} clicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}

export default WithErrorHandler
