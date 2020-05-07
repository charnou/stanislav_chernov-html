function logMethod(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    console.log('Method log (decorator)');
    console.log('propertyKey:', propertyKey);
    console.log('target:', target);
    console.log('descriptor:', descriptor);
}