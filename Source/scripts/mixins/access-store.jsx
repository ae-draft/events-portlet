export var AccessStore = ComposedComponent => class extends React.Component {
   static contextTypes = {
     store: React.PropTypes.object.isRequired
   }

   constructor(props, context) {
      super(props, context);
      Object.assign(this, props, context);
   }

   render() {
      return <ComposedComponent {...this.props} {...this.state} {...this.context} />;
   }
};
