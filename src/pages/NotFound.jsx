import PageTransition from '../components/motion/PageTransition';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <PageTransition>
      <PageHero eyebrow="Error 404" title={['This page', { text: "doesn't exist." }]} desc="The page you're looking for may have moved.">
        <div style={{ marginTop: 36 }}>
          <Button to="/">Back to Home</Button>
        </div>
      </PageHero>
    </PageTransition>
  );
}
