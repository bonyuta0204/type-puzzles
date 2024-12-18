import { One, Two, TypeNumber, Zero } from "./number";

type ListNode = { next: ListNode; val: TypeNumber } | null;

type CreateNode<Next, Val extends TypeNumber> = { next: Next; val: Val };

type Node1 = CreateNode<null, Zero>;

type Node2 = CreateNode<Node1, One>;

type Node3 = CreateNode<Node2, Two>;

type NextNode<N extends ListNode> = N extends object ? N["next"] : null;

/**
 * Detect cycle in LinkedList
 */
type HasCycle<
  SlowNode extends ListNode,
  FastNode extends ListNode
> = NextNode<FastNode> extends null
  ? false
  : NextNode<NextNode<FastNode>> extends null
  ? false
  : SlowNode extends FastNode
  ? true
  : HasCycle<NextNode<SlowNode>, NextNode<NextNode<FastNode>>>;

type Result = HasCycle<NextNode<Node3>, NextNode<Node3>>;
