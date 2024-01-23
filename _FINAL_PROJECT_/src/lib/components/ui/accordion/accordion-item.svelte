<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	type $$Props = AccordionPrimitive.ItemProps;
	export let value: $$Props['value'];
</script>

<AccordionPrimitive.Item {value} {...$$restProps}>
	<slot />
</AccordionPrimitive.Item>
